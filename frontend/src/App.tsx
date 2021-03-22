import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// components
import { Home } from './containers/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          data-testid="homeContainer"
          exact path="/" >
          < Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
