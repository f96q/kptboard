const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './frontend/javascripts/application.js'
  },
  output: {
    filename: 'application.js',
    path: path.resolve('./app/assets/javascripts')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react', 'es2015', 'stage-2'] }
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
