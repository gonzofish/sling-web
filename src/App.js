// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import {
  BrowserRouter,
  Switch
} from 'react-router-dom';

import { authenticate } from './actions/session';

import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Signup from './components/Signup';

type Props = {
  authenticate: () => void
};

class App extends Component {
  props: Props;

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    }
  }

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

export default connect(
  null,
  { authenticate }
)(App);
