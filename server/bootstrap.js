NODE_ENV = "development";
BABEL_ENV = NODE_ENV;

require("ignore-styles");

require("babel-register")({
  ignore: [/(node_modules)/],
  presets: ["es2015", "react-app"],
  plugins: ["transform-decorators-legacy"]
});

const path = require("path");
const rewireMobX = require("react-app-rewire-mobx");

require("./index");
