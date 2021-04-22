// 设置 rem 函数
const setRem = () => {
  // 获取html的Dom元素
  let htmlDom = document.getElementsByTagName('html')[0]
  let designWidth = 750 // 默认设计稿尺寸为750px，如果设计师提供设计稿为别的尺寸，则替换相应尺寸
  htmlDom.style.fontSize = 100 / designWidth * 100 + 'vw' // 设置根元素字体大小
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = () => {
  setRem()
}
