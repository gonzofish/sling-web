// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../actions/session';

import Navbar from '../Navbar';
import SignupForm from '../SignupForm';

type Props = {
    signup: (data: any, router: Object) => void,
};

class Signup extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    props: Props;

    handleSignup = (data) => this.props.signup(data, this.context.router);

    render() {
        return (
            <div style={{ flex: '1' }}>
                <Navbar />
                <SignupForm onSubmit={this.handleSignup} />
            </div>
        );
    }
}

export default connect(null, { signup })(Signup);