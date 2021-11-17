import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import SignupForm from './pages/SignupForm';
function App() {
  return (
    <Router >
      <Switch>
        <Route path="http://137.184.153.148/" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <SignupForm />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
export default App;