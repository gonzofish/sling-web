// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import {
  BrowserRouter,
  Switch
} from 'react-router-dom';

import { authenticate, unauthenticate } from './actions/session';

import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import RedirectAuthenticated from './components/RedirectAuthenticated';
import RouteAuthenticated from './components/RouteAuthenticated';
import Signup from './components/Signup';

type Props = {
  authenticate: () => void,
  isAuthenticated: boolean,
  unauthenticate: () => void,
  willAuthenticate: boolean
};

class App extends Component {
  props: Props;

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }

  render() {
    const { isAuthenticated, willAuthenticate } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };

    return (

      <BrowserRouter>
        <div style={{ display: 'flex', flex: '1' }}>
          <Switch>
              <RouteAuthenticated exact path="/" component={ Home } { ...authProps } />
              <RedirectAuthenticated path="/login" component={ Login } { ...authProps } />
              <RedirectAuthenticated path="/signup" component={ Signup } { ...authProps } />
              <Route path="*" component={ NotFound } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  (state) => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate
  }),
  { authenticate, unauthenticate }
)(App);
