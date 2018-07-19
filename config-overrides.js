const rewireMobX = require('react-app-rewire-mobx');
const rewirePreact = require('react-app-rewire-preact');
const { injectBabelPlugin } = require('react-app-rewired');
const path = require('path');
/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireMobX(config, env);
  config.resolve.alias._Demo = path.resolve('src/_Demo');
  config.resolve.alias.validations = path.resolve('src/validations/src');
  config.resolve.alias.core = path.resolve('src/Mobx-MVVM/src');
  config.resolve.alias.utils = path.resolve('src/utils/src');
  return config;
};
