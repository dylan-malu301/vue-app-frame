module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 100, // 基础尺寸设置为100,主要是为了方便计算
      propList: ['*'],
      selectorBlackList: ['.van', '.calendar', '.nav-bar', '.loading-mask']
    }
  }
}
