const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')


module.exports = {
    entry : './src/main.js',
    output : {
        filename : './dist/bundle.js'
    },
    mode : 'development',

    devServer : {
        contentBase : './dist',
        hot : true,
        port : 9000
    },

    module : {
        rules : [
            {
                test : /\.css/,
                use : ['style-loader','css-loader']
            }
        ]
    },

    plugins : [
        new HtmlPlugin({
            title : 'Chart.js sample',
            template : './src/index.html'
        })
    ]
}


