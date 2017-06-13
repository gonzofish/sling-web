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
    handleSubmit: (data: any) => void,
    onSubmit: (data:any) => void,
    submitting: boolean
};

class LoginForm extends Component {
    props: Props;
    handleSubmit = (data) => this.props.onSubmit(data);

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <form className={ `card ${ css(styles.card) }`}
                onSubmit={ handleSubmit(this.handleSubmit) }>
                <h3 style={ { marginBottom: '2rem', textAlign: 'center' } }>
                    Login to Sling
                </h3>

                <Field component={ Input }
                    name="email"
                    placeholder="Email"
                    type="text" />
                <Field component={ Input }
                    name="password"
                    placeholder="Password"
                    type="password" />

                <button className="btn btn-bloack btn-primary"
                    disabled={ submitting }
                    type="submit">
                    { submitting ? 'Logging in...' : 'Login' }
                </button>

                <hr style={ { margin: '2rem 0' }} />

                <Link className="btn btn-block btn-secondary"
                    to="/signup">
                    Create a new account
                </Link>
            </form>
        );
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    }

    if (!values.password) {
        errors.password = 'Required';
    }

    return errors;
}

export default reduxForm({
    form: 'login',
    validate
})(LoginForm);