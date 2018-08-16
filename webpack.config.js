const path = require('path');
const webpack = require('webpack');

const config = {
  entry: {
    client: './src/index.js',
    server: './server/middleware/index.js'
  },
  output: {
    path: path.join(__dirname, 'build/'),
    filename: '[name].js',
    publicPath: '/build/'
  },
  module: {
    // rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {
          presets: [
            'babel-preset-es2015',
            'babel-preset-es2017',
            'es2015',
            'es2017',
            'react',
            'stage-2'
          ],
          plugins: ['transform-class-properties', 'transform-decorators-legacy']
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/, // Transform all .css files required somewhere within an entry point...
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      _Demo: 'src/_Demo',
      validations: 'src/validations/src',
      core: 'src/Mobx-MVVM/src',
      utils: 'src/utils/src'
    }
  }
};

module.exports = config;
