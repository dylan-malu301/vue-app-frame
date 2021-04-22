/**
 * @description 全局公用组件注册
 */
import navBarCom from './navBar/index.vue'
import searchBarCom from './searchBar.vue'
import filterCom from './filterComponent/index.vue'
import calendar from './vueHashCalendar/index'

const registerFn = (Vue) => {
  const navBar = {
    install: (Vue) => {
      Vue.component('navBar', navBarCom)
    }
  }
  const searchBar = {
    install: (Vue) => {
      Vue.component('searchBar', searchBarCom)
    }
  }
  const filterComponent = {
    install: (Vue) => {
      Vue.component('filterComponent', filterCom)
    }
  }
  const hashCalendar = {
    install: (Vue) => {
      Vue.component('hashCalendar', calendar)
    }
  }
  Vue.use(navBar)
  Vue.use(searchBar)
  Vue.use(filterComponent)
  Vue.use(hashCalendar)
}
export default registerFn
