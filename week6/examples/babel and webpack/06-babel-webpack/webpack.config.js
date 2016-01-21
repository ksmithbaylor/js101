module.exports = {
  entry: [
    './index'
  ],
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js/,
        exclude: /node_modules/
      }
    ]
  }
};
