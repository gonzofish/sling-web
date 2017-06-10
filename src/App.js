// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import {
  BrowserRouter,
  Switch
} from 'react-router-dom';

import { authenticate, logout, unauthenticate } from './actions/session';

import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import RedirectAuthenticated from './components/RedirectAuthenticated';
import RouteAuthenticated from './components/RouteAuthenticated';
import Room from './components/Room';
import Sidebar from './components/Sidebar';
import Signup from './components/Signup';

type Props = {
  authenticate: () => void,
  currentUserRooms: Array,
  isAuthenticated: boolean,
  logout: () => void,
  unauthenticate: () => void,
  willAuthenticate: boolean
};

class App extends Component {
  handleLogout = (router) => this.props.logout(router);
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
    const { currentUserRooms, isAuthenticated, willAuthenticate } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };

    return (

      <BrowserRouter>
        <div style={{ display: 'flex', flex: '1' }}>
          { isAuthenticated &&
          <Sidebar onLogoutClick={ this.handleLogout }
            rooms={ currentUserRooms }
            router={ this.context.router } />
          }
          <Switch>
              <RouteAuthenticated exact path="/" component={ Home } { ...authProps } />
              <RedirectAuthenticated path="/login" component={ Login } { ...authProps } />
              <RedirectAuthenticated path="/signup" component={ Signup } { ...authProps } />
              <RouteAuthenticated path="/r/:id" component={ Room } {...authProps} />
              <Route path="*" component={ NotFound } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  (state) => ({
    currentUserRooms: state.rooms.currentUserRooms,
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate
  }),
  { authenticate, logout, unauthenticate }
)(App);
