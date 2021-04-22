export const demoRouter = [
  {
    path: '/chartDemo',
    name: 'chartDemo',
    component: () => import(/* webpackChunkName: "pageWithoutLayout" */ '@/views/demo/chartsDemo.vue'),
    meta: {
      title: '图表示例',
      needLogin: true,
      index: 2
    }
  },
  {
    path: '/directiveDemos',
    name: 'directiveDemo',
    component: () => import(/* webpackChunkName: "pageWithoutLayout" */ '@/views/demo/directiveDemo.vue'),
    meta: {
      title: '自定义指令示例',
      needLogin: true,
      index: 2
    }
  },
  {
    path: '/componentDemos',
    name: 'componentDemo',
    component: () => import(/* webpackChunkName: "pageWithoutLayout" */ '@/views/demo/componentDemo.vue'),
    meta: {
      title: '组件示例',
      needLogin: true,
      index: 2
    }
  },
  {
    path: '/skinDemo',
    name: 'skinDemo',
    component: () => import(/* webpackChunkName: "pageWithoutLayout" */ '@/views/demo/skinDemo.vue'),
    meta: {
      title: '切换主题色示例',
      needLogin: true,
      index: 2
    }
  },
  {
    path: '/listDemo',
    name: 'listDemo',
    component: () => import(/* webpackChunkName: "pageWithoutLayout" */ '@/views/demo/list.vue'),
    meta: {
      title: 'app分页示例',
      needLogin: true,
      index: 2,
      keepAlive: 'listDemo'
    }
  },
  {
    path: '/i18nDemo',
    name: 'i18nDemo',
    component: () => import(/* webpackChunkName: "pageWithoutLayout" */ '@/views/demo/i18nDemo.vue'),
    meta: {
      title: '多语言切换示例',
      needLogin: true,
      index: 2
    }
  }
]
