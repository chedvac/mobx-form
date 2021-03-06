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
  config.resolve.alias['vm-validations'] = path.resolve(
    'src/vm-validations/src'
  );
  config.resolve.alias['mobx-vm'] = path.resolve('src/mobx-vm/src');
  config.resolve.alias.utils = path.resolve('src/utils/src');
  config.resolve.alias.resources = path.resolve('src/resources');
  config.resolve.alias['mobx-react-form'] = path.resolve(
    'src/mobx-react-form/src'
  );
  config.resolve.alias['mobx-business-components'] = path.resolve(
    'src/mobx-business-components/src'
  );
  config.resolve.alias['react-ui-components'] = path.resolve(
    'src/react-ui-components/src'
  );
  config.resolve.alias['react-navigation-router'] = path.resolve(
    'src/react-navigation-router/src'
  );
  config.resolve.alias['govil-common-content'] = path.resolve(
    'src/govil-common-content/src'
  );
  config.resolve.alias['src'] = path.resolve(
    'src'
  );

  return config;
};
