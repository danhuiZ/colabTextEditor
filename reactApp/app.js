import React from 'react';
import { render } from 'react-dom';
import Routes from './routes.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { HashRouter } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

require('./css/main.css');

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})


render(
  <MuiThemeProvider><HashRouter><Routes /></HashRouter></MuiThemeProvider>,
   document.getElementById('root'));
