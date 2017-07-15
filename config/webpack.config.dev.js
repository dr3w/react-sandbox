/* eslint-disable no-var */
var path = require('path')
var fs = require('fs')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var appDirectory = fs.realpathSync(process.cwd())

var vendorStyles = new ExtractTextPlugin({ filename: 'style/vendor.css', disable: false, allChunks: true })
var appStyles = new ExtractTextPlugin({ filename: 'style/app.css', disable: false, allChunks: true })

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './src/index.jsx'
  ],
  output: {
    path: path.join(appDirectory, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.jsx', '.json', '.js']
  },
  devServer: {
    proxy: [{
      path: '/api/',
      target: 'http://localhost:3000',
      pathRewrite: { '^/api': '' }
    }],
    historyApiFallback: true
  },
  plugins: [vendorStyles, appStyles],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: path.join(appDirectory, 'src')
      },
      {
        test: /node_modules\/.*\.s?css$/,
        use: vendorStyles.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.s?css$/,
        exclude: [/node_modules/],
        use: appStyles.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|ico)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  }
}
