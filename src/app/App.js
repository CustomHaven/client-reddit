import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css'
import { Navbar  }from '../components/navbar/Navbar.js';
import Banner from '../components/Banner/Banner.js'
import Home from '../components/home/Home.js';
import reddit from '../util/reddit-data.js';
import Subreddits from '../components/subreddits/Subreddits.js';


function App() {
  
  return (
    <Router>
      
      <header>
      <Navbar />
      </header>
      <Banner />
      <main className="the-flex-container">
      <aside>
          
      </aside>
      <Switch>
        <section className="section-name">
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
