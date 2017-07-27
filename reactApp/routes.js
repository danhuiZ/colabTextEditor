import React from 'react';
import Document from './components/document.js';
import Login from './components/login.js';
import Registration from './components/registration.js';
import DocPortal from './components/docportal.js';
import { Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';
var socket = io('http://localhost:3000/');


class Routes extends React.Component {
  componentDidMount() {
    socket.emit('sayHello', {message: 'Hello!'});
  }
  render() {
    return (
      <Switch>
        <Route exact path ="/" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <Route path="/documents/:docID" render={(props) => <Document socket={socket} {...props}/>} />
        <Route exact path="/doc-portal" component={DocPortal} />
      </Switch>
    );
  }
}


export default Routes;
