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
    }
}