import React from 'react';
import ReactDOM from 'react-dom';
import '_Demo/index.css';
import App from '_Demo/App';
import registerServiceWorker from '_Demo/registerServiceWorker';
import DevTools from 'mobx-react-devtools';
import { BrowserRouter } from 'react-router-dom';

console.log('run in client');
ReactDOM.render(
  <div>
    <DevTools />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>,
  document.getElementById('root')
);
registerServiceWorker();
