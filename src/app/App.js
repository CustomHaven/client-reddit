import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css'
import { Navbar  }from '../components/navbar/Navbar.js';
import Home from '../components/home/Home.js';
import reddit from '../util/reddit-data.js';
import Subreddits from '../components/subreddits/Subreddits.js';



// const regexValidation = /\.jpg$/
// const children = reddit.getPopular();
// for (let i = 0; i < children.length; i++) {
//   console.log(children[i].match(regexValidation))
// }
// console.log(reddit.getSubreddits());
function App() {
  
  return (
    <Router>
      <main className="the-grid">
      <header>
      <Navbar />
      </header>
      <aside>
          
      </aside>
      <Switch>
        <section>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/dragon/:prefix' children={<Subreddits />}></Route>
        </section>
      </Switch>
      </main>
    </Router>
  );
}

export default App;
