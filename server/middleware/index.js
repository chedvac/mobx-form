import React from 'react';
import { StaticRouter } from 'react-router-dom';
// import our main App component
import App from '../../src/_Demo/App';
const context = {};
export default class ServerComponent extends React.Component {
  render() {
    return (
      <StaticRouter context={context}>
        <App />
      </StaticRouter>
    );
  }
}
