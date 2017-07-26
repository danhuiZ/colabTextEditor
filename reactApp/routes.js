var React = require('react');
import Document from './components/document.js';
import Login from './components/login.js';
import Registration from './components/registration.js';
import DocPortal from './components/docportal.js';
import { Switch, Route } from 'react-router-dom';

const Routes = () => (
  <Switch>
    <Route exact path ="/" component={Login} />
    <Route exact path="/registration" component={Registration} />
    <Route path="/documents" component={Document} />
    <Route path="/doc-portal" component={DocPortal} />
  </Switch>
);

export default Routes;
