// @flow
import React from 'react';

type Props = {
    input: Object;
    label?: string;
    meta: Object;
    placeholder?: string;
    style?: Object;
    type?: string;
}

const Input = ({ input, label, meta, placeholder, style, type}: Props) =>
    <div style={ { marginBottom: '1rem' } }>
        { label && <label htmlFor={ input.name }>{ label }</label> }

        <input { ...input }
            className="form-control"
            placeholder={ placeholder }
            style={ style && style }
            type={ type } />
        { meta.touched && meta.error &&
        <div style={ { color: 'rgb(255, 58, 48)', fontSize: '85%' } }>
            { meta.error }
        </div>
        }
    </div>

export default Input;