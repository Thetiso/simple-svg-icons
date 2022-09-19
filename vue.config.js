module.exports = {
    publicPath: '/',
    lintOnSave: true,
    devServer: {
        port: 8080,
        https: true,
    },
    configureWebpack: {
        externals: {
            // 'weixin-js-sdk': 'wx'
        },
    },

}