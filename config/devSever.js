const devServer = {
  port: 3000,
  disableHostCheck: true,
  proxy: {
    '/api': {
      target: 'http://192.168.1.184:9009/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}

module.exports = devServer
