import React from 'react';
import ReactDOM from 'react-dom';
import './_Demo/index.css';
import App from './_Demo/App';
import registerServiceWorker from './_Demo/registerServiceWorker';
import DevTools from 'mobx-react-devtools'

ReactDOM.render(
<div><DevTools /><App /></div>, 
document.getElementById('root'));
registerServiceWorker();
