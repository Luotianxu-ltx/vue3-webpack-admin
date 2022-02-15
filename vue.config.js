const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
    transpileDependencies:['element-plus'],
    devServer: {
        port: 7000, // 端口号，如果端口号被占用，会自动提升1
        host: 'localhost', // 主机名
        https: false, // 协议
        open: true, // 启动服务时自动打开浏览器访问
        proxy: {
            // 开发环境代理配置
            [process.env.VUE_APP_BASE_URL + '/api']: {
                target: 'https://mock.apipost.cn/app/mock/project/d5c047b0-0e83-4778-a6b1-edae4f63dfbf',
                changeOrigin: true,
                pathRewrite: {
                    [process.env.VUE_APP_BASE_URL + '/api']: '/'
                }
            },
            [process.env.VUE_APP_BASE_URL + '/map']: {
                target: 'https://restapi.amap.com',
                changeOrigin: true,
                pathRewrite: {
                    [process.env.VUE_APP_BASE_URL + '/map']: '/'
                }
            },
            [process.env.VUE_APP_BASE_URL + '/jhApi']: {
                target: 'http://v.juhe.cn',
                changeOrigin: true,
                pathRewrite: {
                    [process.env.VUE_APP_BASE_URL + '/jhApi']: '/'
                }
            }
        }
    },
    productionSourceMap: false, // 打包时不会生成 .map 文件，加快打包速度
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                resolvers: [ElementPlusResolver()]
            })
        ]
    }
}
