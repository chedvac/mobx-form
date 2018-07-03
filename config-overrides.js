const rewireMobX = require('react-app-rewire-mobx');
const rewirePreact = require('react-app-rewire-preact');
const { injectBabelPlugin } = require('react-app-rewired');
const path = require('path');
/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireMobX(config, env);
  config.resolve.alias.validations = path.resolve('src/validations/src');
  return config;
};
