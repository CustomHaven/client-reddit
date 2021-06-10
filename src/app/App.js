import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar  }from '../components/navbar/Navbar.js';
import Home from '../components/home/Home.js';
import reddit from '../util/reddit-data.js';



// const regexValidation = /\.jpg$/
// const children = reddit.getPopular();
// for (let i = 0; i < children.length; i++) {
//   console.log(children[i].match(regexValidation))
// }
// console.log(reddit.getSubreddits());
function App() {
  
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/r/Home">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
