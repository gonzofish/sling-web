// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { Field, reduxForm } from 'redux-form';

const styles = StyleSheet.create({
  button: {
    background: 'rgba(214, 214, 214)',
    borderColor: 'rgba(214, 214, 214)',
    borderWidth: '2px',
    color: 'rgb(80, 80, 80)'
  },
  form: {
    background: '#fff',
    padding: '0px 10px 10px 10px'
  },
  input: {
    borderColor: 'rgba(214, 214, 214)',
    borderWidth: '2px'
  }
});

type Props = {
  handleSubmit: (callback: Function) => void,
  onSubmit: (data: any) => void,
  submitting: boolean
};

class MessageForm extends Component {
  handleSubmit = (data) => this.props.onSubmit(data);
  props: Props;

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form className={ css(styles.form) } onSubmit={ handleSubmit(this.handleSubmit) }>
        <div className="input-group">
          <Field component="input"
            name="text"
            type="text"
            className={ `form-control ${ css(styles.input) }`} />
          <div className="input-group-btn">
            <button className={ `btn ${ css(styles.button) }`}
              disabled={ submitting }>
              Send
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.text) {
    errors.text = 'Required';
  }

  return errors;
}

export default reduxForm({
  form: 'newMessage',
  validate
})(MessageForm);