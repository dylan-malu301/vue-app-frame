import Vue from 'vue'
import App from './App.vue'
import VueAMap from 'vue-amap'
import router from './router/router'
import store from './store/index'
import globalDirectives from './directive/index'
import i18n from '@/i18n/index'
import theme from './libs/theme'
import componentsRegister from '@/components/index.js'
import Vant from 'vant'
import './assets/css/public.css'
import 'vant/lib/index.less'
import 'vant/lib/icon/local.less'
import './assets/theme/theme.less'
import '@/libs/rem.js'

// 全局自定义指令注册
globalDirectives(Vue)
// 全局组件注册
componentsRegister(Vue)
Vue.use(Vant)
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '9364121b98d4501c9b93955e44a0c80c',
  plugin: ['AMap.Geolocation', 'AMap.CitySearch', 'AMap.Geocoder'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
if (process.env.NODE_ENV === 'production') {
  Vue.config.productionTip = false
} else {
  Vue.config.devtools = true
}

new Vue({
  router,
  store,
  i18n,
  mounted () {
    if (window.localStorage.getItem('_themeSign')) {
      let themeSign = window.localStorage.getItem('_themeSign')
      theme.changeTheme(themeSign)
    } else {
      theme.changeTheme()
    }
  },
  render: h => h(App)
}).$mount('#app')
