/**
 * @description 自定义防抖指令 可用于防止用户频繁点击操作造成的错误
 * 自定义防抖指令有三种写法，我也同步在指令中做了处理。第一种是纯函数方式，不传参数：v-debounce="function"
 * 第二种函数需要传参：v-debounce:函数名="参数" 如果是多个参数，则参数为数组形式传递，例v-debounce:函数名="[参数1, 参数2, 参数3]"
 * 第三种函数需要传参，并且需要传$event事件对象，则写法为v-debounce="[($event)=>{ 函数名($event, '423'), 延迟时间}]"
 * 其中第三种方式可覆盖替换方式二，只是写法不同而已，都可以达到传参的效果。可参考自定义指令demo页面
 */
import { debounce } from '@/libs/util.js'
export default {
  inserted: (el, binding, vnode) => {
    let executeFn
    if (binding.arg) {
      let that = vnode.context
      let hasArgFn = () => {
        if (binding.value instanceof Array) {
          that[binding.arg](...binding.value)
        } else {
          that[binding.arg](binding.value)
        }
      }
      executeFn = debounce(hasArgFn, 2000)
    } else {
      if (binding.value instanceof Array) {
        const [func, time = 2000] = binding.value
        executeFn = debounce(func, time)
      } else {
        executeFn = debounce(binding.value, 2000)
      }
    }
    el.addEventListener('click', executeFn)
  }
}
