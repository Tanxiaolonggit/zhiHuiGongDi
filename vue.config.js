module.exports = {
    publicPath: './',
    lintOnSave: false,  // 关闭eslint
    // configureWebpack: {
    //     devServer: {
    //         proxy: {
    //             '/api': {
    //                 target: 'http://47.98.254.131:8678',
    //                 changeOrigin: true, //是否跨域
    //                 pathRewrite: {
    //                     '^/api': '' //规定请求地址以什么作为开头
    //                 }
    //             }
    //         }
    //     }
    // }
}