import axios from 'axios'
import Encrypt from '@/libs/crypto'
import config from '@/config'
import store from '@/store/index'
import httpErrorConfig from '@/libs/httpErrorConfig'
import { Toast } from 'vant'
import { sessionClear, sessionRead, getDate, unzip } from './util'
import { resetRouter } from '@/router/router.js'
class HttpRequest {
  constructor () {
    this.queue = {}
    this.encrypt = new Encrypt()
    this.key = ''
    this.outLoginTimer = null
    this.args = null // 未加密参数
    this.argsOnSecret = null // 加密参数
    // 来源平台和版本
    this.platform = config.platform
    this.version = config.version
  }
  getInsideConfig () {
    const config = {
      // 请求头信息
      headers: {
        // 'Content-Type': 'application/json',
        Accept: '*/*'
      }
    }
    return config
  }
  destroy (option) {
    delete this.queue[option.url]
  }
  interceptors (instance, options) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        const { isToken, isEncrypt, otherToken, isRequestTip, isZip } = options
        config.isRequestTip = isRequestTip
        const token = store.state.user.token
        if (!token && isToken !== false) {
          Toast.fail('token不能为空')
          return
        }
        // 请求头，拼接otherToken
        if (otherToken) {
          config.headers._OtherToken_ = otherToken
        }
        // 请求头，拼接token
        if (isToken !== false) {
          let token = store.state.user.token || ''
          config.headers.token = token
        }
        // 控制后台返回参数是否压缩
        if (isZip) {
          config.headers.compressType = 'gzip'
        }
        const currHours = getDate(new Date().getTime(), 'hours')
        if (sessionRead(currHours) === currHours) {
          delete config.headers.compressType
        }
        /**
         * 拦截上行参数，加密
         */
        // 生成key 加密传入后台
        if (isEncrypt !== false && sessionRead(currHours) !== currHours) {
          this.key = this.encrypt.rndStr(16)
          const secretKey = this.encrypt.keyJsencrypt(this.key)
          config.headers.secretKey = secretKey
        }
        // 加密上行参数
        let params = config.data
        if (params) {
          params.platform = this.platform
          params.version = this.version
          if (isEncrypt !== false && sessionRead(currHours) !== currHours) {
            params = this.cloneParams(params)
          }
          config.data = params
          this.argsOnSecret = params
        }
        this.queue[options.url] = true
        store.commit('pub/updateLoadingStatus', { isLoading: true })
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    // 响应拦截
    instance.interceptors.response.use(
      res => {
        const { isRequestTip, isZip } = res.config
        this.destroy(options)
        const jsonData = res.data
        if (
          jsonData &&
          jsonData.code &&
          jsonData.code !== 200 &&
          jsonData.code !== 430 &&
          isRequestTip !== false
        ) {
          const codeLen = jsonData.code.length
          const message = jsonData.message || jsonData.data.detail
          // 新版本业务代码
          if (codeLen === 6) {
            if (Number(jsonData.code) > 0) {
              // 业务成功
              Toast(message)
            } else {
              Toast.fail(message)
            }
          } else {
            // 老版本业务代码
            if (
              Number(jsonData.code) === 508 ||
              Number(jsonData.code) === 401
            ) {
              // 508 TOKEN无效 401 访问未授权 跳转到登录页面
              const toast = Toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                message: `${message}，3秒钟后退出系统！`
              })
              let second = 3
              const timer = setInterval(() => {
                second--
                if (second) {
                  toast.message = `${message}，${second}秒钟后退出系统！`
                } else {
                  clearInterval(timer)
                  // 手动清除 Toast
                  Toast.clear()
                }
              }, 1000)
              if (this.outLoginTimer) {
                clearTimeout(this.outLoginTimer)
              }
              this.outLoginTimer = setTimeout(() => {
                // this.outLogin()
                // 退出登录方法（具体由项目决定）
              }, 3000)
            } else {
              Toast(message)
            }
          }
        }
        const currHours = getDate(new Date().getTime(), 'hours')
        if (jsonData && jsonData.code && jsonData.code === 200 && isZip && sessionRead(currHours) !== currHours) {
          jsonData.data = JSON.parse(unzip(jsonData.data.gzip))
        }
        store.commit('pub/updateLoadingStatus', { isLoading: false })
        return jsonData
      },
      error => {
        this.destroy(options)
        let errorInfo = error.response
        if (errorInfo) {
          // http请求错误弹窗显示
          httpErrorConfig.content.content.forEach(item => {
            if (item.code === errorInfo.status) {
              Toast.fail(item.tip)
            }
          })
        } else {
          console.error(error)
        }
        store.commit('pub/updateLoadingStatus', { isLoading: false })
        return Promise.reject(error)
      }
    )
  }
  request (options) {
    // 请求配置
    if (process.env.NODE_ENV === 'development') options.url = '/api/' + options.url
    if (process.env.NODE_ENV === 'production') options.url = '/api/' + options.url
    axios.defaults.timeout = 300000
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options)
    return instance(options)
  }
  // 上行参数 clone
  cloneParams (params) {
    this.args = params
    let tempParams = JSON.parse(JSON.stringify(params))
    return this.isArrayOrMap(tempParams)
  }
  // 判断数据对象是MAP还是ARRAY
  isArrayOrMap (data) {
    if (Object.prototype.toString.call(data) === '[object Array]') {
      return this.dataArray(data)
    } else if (Object.prototype.toString.call(data) === '[object Object]') {
      return this.dataMap(data)
    }
  }
  // MAP类型分解加密
  dataMap (dataMap) {
    for (let item in dataMap) {
      if (Object.prototype.toString.call(dataMap[item]) === '[object Array]') {
        this.dataArray(dataMap[item])
      } else if (
        Object.prototype.toString.call(dataMap[item]) === '[object Object]'
      ) {
        this.dataMap(dataMap[item])
      } else {
        dataMap[item] =
          dataMap[item] === null || dataMap[item] === undefined
            ? ''
            : dataMap[item]
        dataMap[item] = this.encrypt.encrypt(dataMap[item], this.key)
      }
    }
    return dataMap
  };
  // ARRAY类型分解加密
  dataArray (dataArray) {
    for (let i = 0; i < dataArray.length; i++) {
      if (Object.prototype.toString.call(dataArray[i]) === '[object Array]') {
        this.dataArray(dataArray[i])
      } else if (
        Object.prototype.toString.call(dataArray[i]) === '[object Object]'
      ) {
        this.dataMap(dataArray[i])
      } else {
        dataArray[i] =
          dataArray[i] === null || dataArray[i] === undefined
            ? ''
            : dataArray[i]
        dataArray[i] = this.encrypt.encrypt(dataArray[i], this.key)
      }
    }
    return dataArray
  };
  outLogin () {
    sessionClear()
    resetRouter()
  };
}
export default HttpRequest
