import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './homepage';
import NotFound from './notFound';

const Main = () => {
  return (
    <Router>
      <div id="mainPage">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default Main;
