/* eslint-env node */

module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { test: /\.scss?$/, loaders: [ 'style', 'css', 'sass' ] },
      { test: /\.png$/, loader: 'file-loader' },
      {
        test: /\.css?$/,
        loaders: [ 'style', 'css' ],
        include: __dirname + '/../'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
}
