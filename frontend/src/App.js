import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import SignupForm from './pages/SignupForm';
import PasswordReset from './pages/PasswordReset';
function App() {
  return (
    <Router >
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        
        <Route path="/signup" exact>
          <SignupForm />
        </Route>
        
        <Route path="/passwordreset" exact>
          <PasswordReset />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
export default App;