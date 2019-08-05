const path = require('path')

const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@cop', resolve('src/components'))
            .set('@style', resolve('src/assets/style'))
            .set('@icon', resolve('src/assets/icon'))
    },
    productionSourceMap: false,
    devServer: {
        port: 8800,
        proxy: {
            '/api': {
                target: 'http://kst.lisfes.cn',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/server': {
                target: 'http://kst.lisfes.cn/server',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/server': ''
                }
            },
            '/bing': {
                target: 'http://proxy.lisfes.cn',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/bing': ''
                }
            }
        }
    }
}