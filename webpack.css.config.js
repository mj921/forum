// webpack.config.js
var precss = require('precss');
var cssnext = require('cssnext');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var Ex = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry:{
        'user/login':__dirname + "/src/stylesheets/user/login.css",
        
    },
    output:{
        path:__dirname + "/public/stylesheets/",
        filename:"[name].css"
    },
     module:{
        loaders:[
            {
                test:/\.css$/,
                loader: Ex.extract(['style-loader', 'css-loader!postcss-loader'])
            },
            // {
            //     test:/\.(png|jpg)$/,
            //     loader:'url-loader?limit=8192&name=../images/baseCss/[name].[ext]'
            // },
            // {
            //     // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
            //     test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
            //     loader: 'file-loader?name=../stylesheets/fonts/[name].[ext]',
            // },
        ]
    },
    postcss: function() {
        return [autoprefixer, precss, cssnano, cssnext]
    },
    plugins:[
        new Ex(__dirname + "/public/stylesheets/[name].css")
    ]
}