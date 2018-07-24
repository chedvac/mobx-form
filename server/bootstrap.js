process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
require('module-alias/register');

require('ignore-styles');

require('babel-register')({
  ignore: [/(node_modules)/],
  presets: ['es2015', 'react-app'],
  plugins: ['transform-decorators-legacy']
});

require('./index');
