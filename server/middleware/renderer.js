import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ServerComponent from './index';
const path = require('path');
const fs = require('fs');

// save as file
// const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');
// fs.readFile(filePath, 'utf8', (err, htmlData) => {
//   if (err) {
//     console.error('err', err);
//   }
//   // render the app as a string
//   const html = ReactDOMServer.renderToString(<ServerComponent />);
//   // inject the rendered app into our html and send it
//   const indexString = htmlData.replace(
//     '<div id="root"></div>',
//     `<div id="root">${html}</div>`
//   );
//   fs.writeFile(
//     path.resolve(__dirname, '..', 'server.html'),
//     indexString,
//     err => {
//       if (err) {
//         console.log('err', err);
//       }
//       console.log('The file has been saved!');
//     }
//   );
// });

// for express
export default (req, res) => {
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');
  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      const notFound = 404;
      return res.status(notFound).end();
    }
    // render the app as a string
    const html = ReactDOMServer.renderToString(<ServerComponent />);
    // inject the rendered app into our html and send it
    return res.send(
      htmlData.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    );
  });
};
