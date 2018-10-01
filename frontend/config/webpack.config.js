const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './frontend/javascripts/application.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./app/assets/javascripts')
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
