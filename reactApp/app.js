import React from 'react';
import { render } from 'react-dom';
import Routes from './routes.js';
import { HashRouter } from 'react-router-dom';
// import { TwitterPicker } from 'react-color';
// import { Collapse } from 'react-collapse';

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})
require('./css/main.css');
require('./css/Draft.css');

render(
  <HashRouter><Routes /></HashRouter>,
  document.getElementById('root')
);
