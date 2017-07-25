var React = require('React');
import Document from './components/document.js';
import Login from './components/login.js';
import Registration from './components/registration.js';
import { Switch, Route } from 'react-router-dom';

const Routes = () => (
  <Switch>
    <Route exact path ="/" component={Document} />
    <Route exact path="/registration" component={Registration} />
    <Route path="/login" component={Login} />
  </Switch>
);

export default Routes;
