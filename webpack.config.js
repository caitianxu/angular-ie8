var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var isDev = process.env.NODE_ENV === 'development';

var config = {
    target: 'web',
    entry: {
        app: path.join(__dirname, 'index.js')
    },
    output: {
        filename: '[name].[hash:5].js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        //使用html模板
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            }
        }),
        //复制静态资源
        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: 'assets'
        }, {
            from: 'src/controllers',
            to: 'controllers'
        }]),
    ]
};
if (isDev) {
    config.devServer = {
        port: 8000,
        host: 'localhost'
    };
}
else {
    //输出主js文件
    config.output.filename = '[name].[chunkhash:5].js';
}
module.exports = config;