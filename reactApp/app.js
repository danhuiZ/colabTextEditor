var React = require('react');
var ReactDOM = require('react-dom');
import Routes from './routes.js';
import { BrowserRouter } from 'react-router-dom';
// import { TwitterPicker } from 'react-color';
// import { Collapse } from 'react-collapse';


/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

ReactDOM.render(<BrowserRouter>
  <Routes />
</BrowserRouter>,
   document.getElementById('root'));
