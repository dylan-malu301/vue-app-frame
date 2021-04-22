import autoFocus from './modules/autoFocus'
import debounce from './modules/debounce'
const globalDirectives = Vue => {
  Vue.directive('autoFocus', autoFocus)
  Vue.directive('debounce', debounce)
}
export default globalDirectives
