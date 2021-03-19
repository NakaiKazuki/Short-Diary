import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// components
import { Homes } from './containers/Homes';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact path="/" >
          < Homes />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
