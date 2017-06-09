// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/session';

import Navbar from '../Navbar';
import SignupForm from '../SignupForm';

type Props = {
    signup: () => void,
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