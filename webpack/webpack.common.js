const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

const rules = require('./webpack.rules');

module.exports = {
  entry: [ 
    './src/Game.js'
  ],
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  resolve: {
    extensions: ['.js'],
    plugins: [
      new DirectoryNamedWebpackPlugin()
    ]
  },
  module: {
    rules: rules
  }
};
