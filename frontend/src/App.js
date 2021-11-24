import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Redirect, Switch, withRouter } from 'react-router-dom';
import Login from './pages/Login';
import SignupForm from './pages/SignupForm';
import PasswordReset from './pages/PasswordReset';
function App() {
  return (
    <Router>
      <Switch>
        
          {/* <Login />
        </Route> */}
        
        <Route path="/signup" component={SignupForm} />
          {/* <SignupForm />
        </Route> */}
        
        <Route path="/passwordreset" component={PasswordReset} />
          {/* <PasswordReset />
        </Route> */}
        {/* <Redirect to="/" /> */}
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>
  );
}
export default App;