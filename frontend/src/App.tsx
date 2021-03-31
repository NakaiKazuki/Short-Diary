import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// cotexts
import {CurrentUserProvider} from './contexts/CurrentUser';

// components
import { Header } from './containers/Header';
import { Home } from './containers/Home';
import { SignUp } from './containers/SignUp';
import { Login } from './containers/Login';

function App() {
  return (
    <Router>
      <CurrentUserProvider>
        <Header/>
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
      </CurrentUserProvider>
    </Router>
  );
}

export default App;
