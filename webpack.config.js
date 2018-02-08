// webpack.config.js
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:{
        'index':__dirname + "/src/javascripts/index.js",
        'user/login':__dirname + "/src/javascripts/user/login.js",
        'user/register':__dirname + "/src/javascripts/user/register.js"
    },
    output:{
        path:__dirname + "/public/javascripts/",
        publicPath:'../',
        filename:"[name].js"
    },
     module:{
        loaders:[
            {
                test:/\.css$/,
                loader:ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
            },
            {
                test:/\.(png|jpg)$/,
                loader:'url-loader?limit=8192&name=../images/[name].[hash:8].[ext]'
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'file-loader?name=../stylesheets/fonts/[name].[ext]',
            }
        ]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("../stylesheets/[name].css")
    ]
}