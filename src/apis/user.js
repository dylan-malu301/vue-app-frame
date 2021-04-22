import axios from '@/libs/api.request.js'
import accountInfo from '../../config/account'
import lodash from 'lodash'

// 获取免登陆用户的userId
export const getUserId = (params) => {
  return axios.request({
    url: 'wkApplyInfo/getUserId',
    isToken: false,
    params,
    method: 'get'
  })
}

export const clockIn = (data) => {
  return axios.request({
    url: 'wkApplyInfo/clockIn',
    data,
    method: 'put'
  })
}

export const getApprovelist = (data) => {
  return axios.request({
    url: 'workFlowInfo/getApprovelist',
    data,
    method: 'post'
  })
}

let timer = null
export const login = (userInfo) => {
  return new Promise((resolve, reject) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      for (let i = 0; i < accountInfo.length; i++) {
        let accountUserInfo = lodash.cloneDeep(accountInfo[i])
        let timeStatus = new Date().getTime()
        if (accountUserInfo.userName === userInfo.userName && accountUserInfo.password === userInfo.password) {
          delete accountUserInfo.password
          resolve(
            {
              code: 200,
              token: `${timeStatus}15kfshf8st6dsc3e24f370ee4035c2f4657eb6378f6hkj6h6gh6gh68dgdfg89fhgfh89gfh90f`,
              message: '登录成功！',
              data: accountUserInfo.data
            }
          )
          return
        }
      }
      resolve(
        {
          code: 10001,
          message: '用户名或密码错误！'
        }
      )
    }, 1000)
  })
}
