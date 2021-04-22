export const baseRouter = [
  {
    path: '/',
    name: 'layout',
    redirect: '/login',
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/withBottomBar.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/Home/index'),
        meta: {
          title: '首页',
          needLogin: true,
          index: 1
        }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/user/index'),
        meta: {
          title: '我的',
          needLogin: true,
          index: 1
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "pageWithoutLayout" */ '@/views/login/index'),
    meta: {
      title: '登录',
      needLogin: false,
      index: 0
    }
  },
  {
    path: '/404notFound',
    name: '404notFound',
    component: () => import(/* webpackChunkName: "pageWithoutLayout" */ '@/views/notFound/index.vue'),
    meta: {
      needLogin: true,
      index: 3
    }
  },
  {
    path: '*',
    redirect: '/404notFound'
  }
]
