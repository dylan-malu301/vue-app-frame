const path = require('path')
const devServer = require('./config/devSever')
const vantTheme = require('./src/libs/vantTheme')
const TerserPlugin = require('terser-webpack-plugin')
const resolve = dir => {
  return path.join(__dirname, dir)
}
const isProd = process.env.NODE_ENV === 'production'
const BASE_URL = isProd ? '' : '/'

const JS_CDN = isProd ? [] : []
const CSS_CDN = isProd
  ? []
  : []
const cdn = {
  js: JS_CDN,
  css: CSS_CDN
}
module.exports = {
  lintOnSave: true,
  productionSourceMap: false, // 设为false打包时不生成.map文件
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/apis'))
      .set('assets', resolve('src/assets'))
      .set('_c', resolve('src/components'))
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  },
  publicPath: BASE_URL,
  assetsDir: 'static',
  pluginOptions: { // 全局公共less
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/theme/base.less')]
    }
  },
  css: { // 覆盖vant基础样式（主题功能）
    loaderOptions: {
      less: {
        modifyVars: vantTheme
      }
    }
  },
  configureWebpack: config => {
    let optimization = {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 2000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name (module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `npm.${packageName.replace('@', '')}`
            }
          }
        }
      }
    }
    const plugins = []
    if (isProd) {
      plugins.push(
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: false,
          terserOptions: {
            compress: {
              pure_funcs: ['console.log']
            },
            warnings: true,
            drop_debugger: true,
            drop_console: true
          }
        })
      )
    }
    Object.assign(config, {
      optimization
    })
    return { plugins }
  },
  devServer: devServer
}
