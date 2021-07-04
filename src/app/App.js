import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'
import { Navbar  }from '../components/navbar/Navbar.js';
import Banner from '../components/Banner/Banner.js';
import Home from '../components/home/Home.js';
import Subreddits from '../components/subreddits/Subreddits.js';
import SearchContent from '../components/searchContent/SearchContent.js';
import Aside from '../components/aside/Aside.js';
import Error from '../components/error/Error.js';

function App() {
  
  return (
    <Router>
      <header>
      <Navbar />
      </header>
      <Banner />
      <main className="the-flex-container">
      <section className="section-name">
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/dragon/:prefix' children={<Subreddits />}></Route>
        <Route path='/search' children={<SearchContent />}></Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      </section>
      <aside>
      <Aside />
      </aside>
      </main>
    </Router>
  );
}

export default App;
