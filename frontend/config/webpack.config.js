module.exports = {
  entry: './frontend/javascripts/application.js',
  output: {
    path: './app/assets/javascripts',
    filename: 'application.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets: ['react', 'es2015', 'stage-2']
        }
      }
    ]
  }
};
