var path = require('path')
var webpack = require('webpack')

var DIRECTORY = path.join(__dirname)

var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: [
    path.join(__dirname, './index.web.js')
  ],
  output: {
    path: __dirname + '/dist',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /components\/mobile/,
        loader: 'ignore-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        loader: 'url-loader',
        query: { name: '[name].[hash:16].[ext]' }
      }
    ]
  },
  resolve: {
    alias: {
      'react-native' : path.resolve(__dirname, 'web-react-native')
    }
  },
  plugins: [
    HTMLWebpackPluginConfig
  ]
}
