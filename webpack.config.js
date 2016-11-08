var debug        = process.env.NODE_ENV !== "production";
var webpack      = require('webpack');
var path         = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: './scripts/index.js',
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: false
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: [
            'es2015', 
            'stage-0'
          ],
          plugins: [
            'transform-class-properties', 
            'transform-decorators-legacy'
          ],
        }
      },
      {test: /\.sass$/, loader: 'style!css!postcss-loader!sass!'}
    ]
  },
  sassLoader: {
    indentedSyntax: true,
    precision: 2
  },
  postcss: function () {
    return [autoprefixer];
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]
};
