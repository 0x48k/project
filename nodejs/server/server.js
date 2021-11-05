'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const {StaticRouter, matchPath} = require('react-router-dom');
const app = express();
const {App} = require('../src/components/App.jsx');
const routes = require('./routes.js');

app.get(/\.(js|css|map|ico)$/, express.static(path.resolve(__dirname, '../dist')));

app.use('*', async (req, res) => {

  const matchRoute = routes.find(route => matchPath(req.originalUrl, route));

  let componentData = null;
  if (typeof matchRoute.component.fetchData === 'function') {
    componentData = await matchRoute.component.fetchData();
  }

  let indexHTML = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), {
    encoding: 'utf8',
  });

  let appHTML = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl} context={componentData}>
      <App/>
    </StaticRouter>
  );

  indexHTML = indexHTML.replace('<div id="app"></div>', `<div id="app">${appHTML}</div>`);

  indexHTML = indexHTML.replace(
    'var initial_state = null;',
    `var initial_state = ${JSON.stringify(componentData)};`
  );

  res.contentType('text/html');
  res.status(200);

  return res.send(indexHTML);
});

app.listen('9000', () => {
  console.log('Express server started at http://localhost:9000');
});

