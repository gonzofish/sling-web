// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../../actions/session';

import LoginForm from '../LoginForm';
import Navbar from '../Navbar';

type Props = {
    login: (data: any, router: any) => void;
};

class Login extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    props: Props;

    handleLogin = (data) => this.props.login(data, this.context.router);

    render() {
        return (
            <div style={{ flex: '1' }}>
                <Navbar />
                <LoginForm onSubmit={this.handleLogin} />
            </div>
        );
    }
}

export default connect(null, { login })(Login);