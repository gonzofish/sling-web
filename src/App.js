// @flow
import React, { Component } from 'react';
import { Route } from 'react-router';
import {
  BrowserRouter,
  Switch
} from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Signup from './components/Signup';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ display: 'flex', flex: '1' }}>
          <Switch>
              <Route exact path="/" component={ Home } />
              <Route path="/login" component={ Login } />
              <Route path="/signup" component={ Signup } />
              <Route path="*" component={ NotFound } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
