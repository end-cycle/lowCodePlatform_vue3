module.exports = {
    devServer: {
        proxy: {
            'upload': {
                target: 'http://82.156.7.135:3001',
                changeOrigin: true,
                pathRewrite: {
                    '^api': ''
                }
            }
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
            config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
        }
    }
}