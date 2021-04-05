import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// cotexts
import {CurrentUserProvider} from './contexts/CurrentUser';
// routes
import { GuestRoute } from './routes';
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
          <Route exact path="/" component={Home} />
          <GuestRoute exact path="/signup" children={<SignUp/>} />
          <GuestRoute exact path="/login" children={<Login/>} />
        </Switch>
      </CurrentUserProvider>
      <footer>ここFooterな！！</footer>
    </Router>
  );
}

export default App;
