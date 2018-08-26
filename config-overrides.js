const rewireMobX = require('react-app-rewire-mobx');
const rewirePreact = require('react-app-rewire-preact');
const { injectBabelPlugin } = require('react-app-rewired');
const path = require('path');
/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireMobX(config, env);
  config.resolve.alias._Demo = path.resolve('src/_Demo');
  config.resolve.alias.validations = path.resolve('src/validations/src');
  config.resolve.alias.core = path.resolve('src/mobx-vm/src');
  config.resolve.alias.utils = path.resolve('src/utils/src');
  config.resolve.alias['react-ui-components'] = path.resolve(
    'src/react-ui-components/src'
  );
  config.resolve.alias['mobx-react-form'] = path.resolve(
    'src/mobx-react-form/src'
  );
  return config;
};
