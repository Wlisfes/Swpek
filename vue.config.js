
const path = require('path')

const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
    assetsDir: 'static',
    productionSourceMap: false,
    chainWebpack: (config) => {
        //移除 prefetch 插件
        config.plugins.delete("prefetch");
        //移除 preload 插件
        config.plugins.delete('preload');
        //压缩代码
        config.optimization.minimize(true);
        //分割代码
        config.optimization.splitChunks({
           chunks: 'all'
        })

        config.resolve.alias
            .set('@', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@cop', resolve('src/components'))
            .set('@style', resolve('src/assets/style'))
            .set('@icon', resolve('src/assets/icon'))
    },
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
            '/assets': {
                target: 'http://kst.lisfes.cn',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/assets': '/assets'
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