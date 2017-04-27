var path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index.jsx'
  ],
  resolve: {
    extensions: ['.jsx', '.json', '.js']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  devServer: {
    proxy: [{
      path: '/api/',
      target: 'http://localhost:3001'
    }],
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: ['babel-loader', 'eslint-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}
