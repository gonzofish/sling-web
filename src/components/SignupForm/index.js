// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';

import Input from '../Input';

const styles = StyleSheet.create({
    card: {
        margin: '2rem auto',
        maxWidth: '500px',
        padding: '3rem 4rem'
    }
});

type Props = {
    handleSubmit: () => void,
    onSubmit: () => void,
    submitting: boolean
};

class SignupForm extends Component {
    props: Props;
    handleSubmit = (data) => this.props.onSubmit(data);

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <form className={ `card ${ css(styles.card) }` }
                onSubmit={ handleSubmit(this.handleSubmit) }>
                <h3 style={ { marginBottom: '2rem', textAlign: 'center' } }>
                    Create an Account
                </h3>

                <Field className="form-control"
                    component={ Input }
                    name="username"
                    placeholder="Username"
                    type="text" />
                <Field className="form-control"
                    component={ Input }
                    name="email"
                    placeholder="Email"
                    type="email" />
                <Field className="form-control"
                    component={ Input }
                    name="password"
                    placeholder="Password"
                    type="password" />

                <button className="btn btn-block btn-primary"
                    disabled={ submitting }
                    type="submit">
                    { submitting ? 'Submitting..' : 'Sign up' }
                </button>

                <hr style={ { margin: '2rem 0' }} />

                <Link className="btn btn-block btn-secondary"
                    to="/login">
                    Login to your account
                </Link>
            </form>
        );
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Minimum of 6 characters';
    }

    return errors;
};

export default reduxForm({
    form: 'signup',
    validate
})(SignupForm);