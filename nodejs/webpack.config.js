'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';
  const plugins = [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ];
  return {
    devtool: devMode ? 'eval-source-map' : undefined,
    devServer: {
      host: '0.0.0.0',
      port: '8080',
      historyApiFallback: true
    },
    entry: {
      main: './src/index.jsx'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
    },
    resolve: {
      alias: {
        generic: path.resolve(__dirname, 'src/components/generic/'),
        lib: path.resolve(__dirname, 'src/lib/'),
        images: path.resolve(__dirname, 'src/images/')
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/i,
          use: ['babel-loader']
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        }
      ]
    },
    plugins
  };
};
