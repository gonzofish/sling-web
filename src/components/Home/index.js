// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logout } from '../../actions/session';
import Navbar from '../Navbar';

type Props = {
    logout: () => void,
    currentUser: Object,
    isAuthenticated: boolean
};

class Home extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    handleLogout = () => this.props.logout(this.context.router);
    props: Props;

    render() {
        const { currentUser, isAuthenticated } = this.props;

        return (
            <div style={ { flex: '1' } }>
                <Navbar />
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </ul>

                { isAuthenticated &&
                <div>
                    <span>{ currentUser.username }</span>
                    <button type="button" onClick={ this.handleLogout }>
                        Logout
                    </button>
                </div>
                }
            </div>
        );
    }
}

export default connect(
    (state) => ({
        isAuthenticated: state.session.isAuthenticated,
        currentUser: state.session.currentUser
    }),
    { logout }
)(Home);