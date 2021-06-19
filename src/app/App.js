import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css'
import { Navbar  }from '../components/navbar/Navbar.js';
import Banner from '../components/Banner/Banner.js';
import Home from '../components/home/Home.js';
import Popular from '../components/popular/Popular';
import reddit from '../util/reddit-data.js';
import Subreddits from '../components/subreddits/Subreddits.js';
import Aside from '../components/aside/Aside.js'


function App() {
  
  return (
    <Router>
      
      <header>
      <Navbar />
      </header>
      <Banner />
      <main className="the-flex-container">
      <Switch>
        <section className="section-name">
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/popular'>
          <Popular />
        </Route>
        <Route path='/dragon/:prefix' children={<Subreddits />}></Route>
        </section>
      </Switch>
      <aside>
      <Aside />
      </aside>
      </main>
    </Router>
  );
}

export default App;
