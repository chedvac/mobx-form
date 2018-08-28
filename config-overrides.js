const rewireMobX = require('react-app-rewire-mobx');
const rewirePreact = require('react-app-rewire-preact');
const { injectBabelPlugin } = require('react-app-rewired');
const path = require('path');
/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireMobX(config, env);
  config.resolve.alias._Demo = path.resolve('src/_Demo');
  config.resolve.alias.validations = path.resolve(
    'src/functional-validations/src'
  );
  config.resolve.alias.vmValidations = path.resolve('src/vm-validations/src');
  config.resolve.alias.core = path.resolve('src/Mobx-MVVM/src');
  config.resolve.alias.utils = path.resolve('src/utils/src');
  config.resolve.alias.mobxReactForm = path.resolve('src/mobx-react-form/src');
  config.resolve.alias.reactUiComponents = path.resolve(
    'src/react-ui-components/src'
  );
  config.resolve.alias.reactNavigationRouter = path.resolve(
    'src/react-navigation-router/src'
  );

  return config;
};
