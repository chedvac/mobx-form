import React from 'react';
import ReactDOM from 'react-dom';
import App from '_Demo/App';
import registerServiceWorker from '_Demo/registerServiceWorker';
import DevTools from 'mobx-react-devtools';
import 'react-ui-components/themes/formStructure.css';

ReactDOM.render(
  <React.Fragment>
    <DevTools />
    <App />
  </React.Fragment>,
  document.getElementById('root')
);
registerServiceWorker();
