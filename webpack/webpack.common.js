const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

const rules = require('./webpack.rules');

module.exports = {
  entry: [ 
    './src/Game/Game.js'
  ],
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: ''
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      Engine: path.resolve(__dirname, '../src/Engine'),
      Game: path.resolve(__dirname, '../src/Game'),
      assets: path.resolve(__dirname, '../assets'),
      constants: path.resolve(__dirname, '../src/constants'),
      utils: path.resolve(__dirname, '../src/utils'),      
      components: path.resolve(__dirname, '../src/components')
    },
    plugins: [
      new DirectoryNamedWebpackPlugin()
    ]
  },
  module: {
    rules: rules
  }
};
