import Vue from 'vue'
import Router from 'vue-router'
import { projectRouter } from './index'
import { baseRouter } from './baseRouter'
import { demoRouter } from './demoRouter'
import store from '@/store/index'
import { Toast } from 'vant'
import { getToken } from '@/libs/util'

Vue.use(Router)
const routes = [...projectRouter, ...baseRouter]
if (process.env.NODE_ENV !== 'production') routes.push(...demoRouter)
const createRouter = () => new Router({
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 使用keep-alive 返回缓存页面后记录浏览位置
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition
    }
    // 异步滚动操作
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 200)
    })
  }
})

let router = createRouter()

/**
 * 自定义重置路由方法
 */
export const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

router.beforeEach((to, from, next) => {
  store.commit('pub/updateLoadingStatus', { isLoading: true })
  const token = getToken()
  if (to.matched.length === 0) { // 未匹配到要前往的路由
    next({
      name: '404notFound'
    })
  } else {
    if (token) {
      if (to.name !== 'login') {
        next()
      } else {
        next({
          name: 'home'
        })
      }
    } else {
      if (to.name !== 'login' && to.meta.needLogin) {
        Toast({
          duration: 1000,
          message: '未登录，即将跳转登录页面！',
          onClose: () => {
            store.commit('pub/updateLoadingStatus', { isLoading: false })
            next({
              name: 'login'
            })
          }
        })
      } else {
        next()
      }
    }
  }
})

router.afterEach(to => {
  store.commit('pub/updateLoadingStatus', { isLoading: false })
  // doSomething...
})

export default router
