var React = require('React');
import Document from './components/document.js';
import Login from './components/login.js';
import Registration from './components/registration.js';
import { Switch, Route } from 'react-router-dom';

const Routes = () => (
  <Switch>
    <Route exact path ="/" component={Login} />
    <Route exact path="/registration" component={Registration} />
    <Route exact path="/documents" component={Document} />
  </Switch>
);

export default Routes;
