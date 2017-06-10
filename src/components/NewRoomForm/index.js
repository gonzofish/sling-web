// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

type Props = {
  handleSubmit: (Object) => void,
  onSubmit: () => void,
  submitting: boolean
};

class NewRoomForm  extends Component {
  handleSubmit = (data) => this.props.onSubmit(data);
  props: Props;

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.handleSubmit) }>
        <div className="input-group">
          <Field className="form-control"
            component="input"
            name="name"
            placeholder="Room Name"
            type="text" />
          <div className="input-group-btn">
            <button className="btn btn-primary" disabled={ submitting } type="submit">
              { submitting ? 'Saving...' : 'Submit' }
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: 'newRoom',
  validate
})(NewRoomForm);
