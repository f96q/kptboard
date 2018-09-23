const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: path.resolve('app/javascript/packs/application.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve('app/assets/javascripts')
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
