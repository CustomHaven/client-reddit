import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar  }from '../components/navbar/Navbar.js';
import Home from '../components/home/Home.js';
import { getPopular } from '../util/reddit-data.js'

console.log(getPopular())
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
