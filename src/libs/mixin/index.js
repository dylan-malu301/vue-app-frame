import backConfig from '../backConfig'

export default {
  data () {
    return {
      backConfig,
      statusBarHeight: window.android ? window.android.getStatusBarHeight() : 0 // 手机状态栏高度
    }
  },
  computed: {

  },
  methods: {
    backFn () {
      const currRouterName = this.$route.name
      if (!currRouterName) {
        this.$router.push({ name: 'home' })
      }
      backConfig.forEach((item) => {
        if (item.current === currRouterName) {
          if (typeof item.parent === 'string') {
            this.$router.push({ name: item.parent })
          } else {
            let routerId = this.$route.params.routerId !== null && this.$route.params.routerId !== undefined ? this.$route.params.routerId : this.$store.state.pub.routerId
            this.$router.push({ name: item.parent[routerId] })
          }
        }
      })
    },
    /**
     * 获取终端信息
     */
    getPhoneStatus () {
      if (window.android) {
        return window.android.getPhoneStatus()
      }
      this.$toast('web端暂不支持获取终端信息！')
    },
    /**
     * 拍照
     */
    getPhoto () {
      if (window.android) {
        return window.android.getPhoto()
      }
      this.$toast('web端暂不支持拍照！')
    },
    /**
     * 打开相册
     */
    findPicture () {
      if (window.android) {
        return window.android.findPicture()
      }
      this.$toast('web端暂不支持打开相册！')
    },
    /**
     * 扫描
     */
    getScanCode () {
      if (window.android) {
        return window.android.getScanCode()
      }
      this.$toast('web端暂不支持扫描二维码！')
    },

    /**
     * key-value形式保存数据
     * @param key
     * @param value
     */
    setValueKey (key, value) {
      if (window.android) {
        return window.android.setValueKey(key, value)
      }
      this.$toast('没有找到安卓终端！')
    },
    /**
     * 根据已知key获取保存的数据
     * @param key
     */
    getValueKey (key) {
      if (window.android) {
        return window.android.getValueKey(key)
      }
      this.$toast('没有找到安卓终端！')
    },
    /**
     * Toast
     *
     * @param message
     */
    showWebToast (message) {
      if (window.android) {
        return window.android.showWebToast(message)
      }
      this.$toast('没有找到安卓终端！')
    }
  },
  mounted () {
    // 接收二维码信息
    window.codeResult = (code) => {
      if (typeof this.codeResult === 'function') {
        this.codeResult(code)
      }
    }
    // 接收照片
    window.photoResult = (pic) => {
      if (typeof this.photoResult === 'function') {
        this.photoResult(pic)
      }
    }
    // 返回
    window.backFn = () => {
      if (typeof this.backFn === 'function') {
        this.backFn()
      }
    }
  },
  beforeDestroy () {

  }
}
