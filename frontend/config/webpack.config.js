const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './frontend/javascripts/application.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./app/assets/javascripts')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'es2016', 'es2017', 'react'] }
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
