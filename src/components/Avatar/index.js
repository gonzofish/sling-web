// @flow
import React from 'react';
import md5 from 'md5';

type Props = {
  email: string,
  size?: number,
  style?: Object
};

const Avatar = ({ email, size = 40, style }: Props) => {
  const hash = md5(email);
  const url = `https://secure.gravatar.com/avatar/${ hash }`;

  return (
    <img alt={ email } src={ url }
      style={ {
        borderRadius: '4px',
        height: `${ size }px`,
        width: `${ size }px`,
        ...style
      }} />
  )
};

export default Avatar;
