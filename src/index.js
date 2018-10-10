import React from 'react';
import ReactDOM from 'react-dom';
import '_Demo/index.css';
import App from '_Demo/App';
import registerServiceWorker from '_Demo/registerServiceWorker';
import DevTools from 'mobx-react-devtools';
import 'reactUiComponents/themes/formStructure.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.Fragment>
    <DevTools />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);
registerServiceWorker();
