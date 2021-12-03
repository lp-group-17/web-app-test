import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Redirect, Switch, withRouter } from 'react-router-dom';
import Login from './pages/Login';
import Resources from './pages/Resources';
import PasswordReset from './pages/PasswordReset';
import GraphPage from './pages/GraphPage';
import PasswordResetRequest from './pages/PasswordResetRequest';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />

        <Route path="/resources" component={Resources}/>
      </Switch>
    </Router>
  );
}
export default App;