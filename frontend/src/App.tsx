import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// components
import { Home } from './containers/Home';
import { SignUp } from './containers/SignUp';
import { Login } from './containers/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact path="/" >
          < Home />
        </Route>
        <Route
          exact path="/signup" >
          < SignUp />
        </Route>
        <Route
          exact path="/login" >
          < Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
