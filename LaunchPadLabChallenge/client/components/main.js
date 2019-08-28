import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Homepage from './homepage';
import NotFound from './notFound';
import Pixelogic from './pixelogic';

const Main = () => {
  return (
    <Router>
      <div id="mainPage">
        <nav>
          <Link to="/">HomePage</Link>
          <Link to="/pixelogic">Pixelogic</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/pixelogic" component={Pixelogic} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default Main;
