var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var isDev = process.env.NODETYPE === '0';
var ExtractPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var config = {
  target: 'web',
  entry: {
    app: path.resolve(__dirname, './src/main.js')
  },
  output: {
    filename: '[name].[hash:5].js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new webpack.DefinePlugin({
      'PRODUCTION': !isDev
    }),
    //使用html模板
    new HtmlWebpackPlugin({
      template: './src/main.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    //复制静态资源
    new CopyWebpackPlugin([{
      from: 'src/lib',
      to: 'lib'
    }, {
      from: 'src/images',
      to: 'images'
    }, {
      from: 'src/views',
      to: 'views'
    }]),
    //单独输出css
    new ExtractPlugin("[name].[hash:5].css")
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: "css-loader",
          options: {
            minimize: isDev ? false : true
          }
        }]
      })
    }]
  }
};
if (isDev) {
  config.devServer = {
    port: 8888,
    host: '0.0.0.0'
  };
}
else{
  //单独输出webpack配置
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin("vendor"));
  //输出js文件压缩
  config.plugins.push(new UglifyJSPlugin({
    uglifyOptions: {
      output: {
        ie8: true
      }
    }
  }));
}
module.exports = config;