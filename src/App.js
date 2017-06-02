// @flow
import React, { Component } from 'react';
import { Route } from 'react-router';
import {
  BrowserRouter,
  Switch
} from 'react-router-dom';

import Home from './components/Home';
import NotFound from './components/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
