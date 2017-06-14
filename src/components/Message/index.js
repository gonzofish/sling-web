// @flow
import React from 'react';
import moment from 'moment';

import Avatar from '../Avatar';

type UserMessage = {
  inserted_at: string;
  text: string;
  user: {
    email: string,
    username: string
  }
};
type Props = {
  message: UserMessage
};

const Message = ({ message: { inserted_at, text, user } }: Props) =>
  <div style={ { display: 'flex', marginBottom: '10px' }}>
    <Avatar email={ user.email } style={ { marginRight: '10px' } } />
    <div>
      <div style={ { lineHeight: '1.2' } }>
        <strong style={ { fontSize: '14px', marginRight: '8px' } }>{ user.username }</strong>
        <time style={ { color: 'rgb(192, 192, 192)', fontSize: '12px' }}>{ moment(inserted_at).format('h:mm A') }</time>
      </div>

      <div>{ text }</div>
    </div>
  </div>;

export default Message;
