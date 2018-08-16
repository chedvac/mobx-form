import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ServerComponent from './index';

const path = require('path');
const fs = require('fs');

export default (req, res, next) => {
  // point to the html file created by CRA's build tool
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end();
    }

    // render the app as a string
    const html = ReactDOMServer.renderToString(<ServerComponent />);
    console.log('html', html);

    // fs.writeFile(filePath, `<div id="root">${html}</div>`);

    // inject the rendered app into our html and send it
    let indexString = htmlData.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    );
    indexString = indexString.replace(
      '<script type="text/javascript" src="/static/js/main.87b1461f.js"></script>',
      '<script type="text/javascript" src="/server.js"></script>'
    );

    fs.writeFile(
      path.resolve(__dirname, '..', '..', 'build', 'server1.html'),
      indexString,
      err => {
        if (err) {
          console.log('err', err);
        }
        console.log('The file has been saved!');
      }
    );

    return res.send(indexString);
  });
};
