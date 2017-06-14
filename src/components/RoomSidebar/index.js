// @flow
import React from 'react';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  header: {
    marginBottom: '10px',
    padding: '20px 15px',
    width: '220px'
  },
  listHeading: {

  },
  roomSidebar: {
    background: '#4d394b',
    color: '#ab9ba9'
  },
  userList: {
    listStyle: 'none',
    paddingLeft: '15px'
  },
  username: {
    fontSize: '14px',
    fontWeight: '300',
    paddingLeft: '20px',
    position: 'relative',
    ':after': {
      background: 'rgb(64, 151, 141)',
      borderRadius: '50%',
      content: '""',
      height: '8px',
      left: '0',
      position: 'absolute',
      top: '7px',
      width: '8px'
    }
  }
});

type User = {
  id: number,
  username: string
};
type Props = {
  currentUser: { username: string },
  presentUsers: Array<User>,
  room: { name: string }
};

const RoomSidebar = (props: Props) => {
  const { currentUser, presentUsers, room } = props;

  return (
  <div className={ css(styles.roomSidebar) }>
    <div className={ css(styles.header) }>
      <h2 className={ css(styles.roomName) }>{ room.name }</h2>
      <div style={ { fontSize: '13px' } }>{ currentUser.username }</div>
    </div>

    <div className={ css(styles.listHeading) }>Active Users</div>
    <ul className={ css(styles.userList) }>
      { (presentUsers || []).map((user) =>
        <li key={ user.id } className={ css(styles.username) }>{ user.username }</li>
      )}
    </ul>
  </div>);
};

export default RoomSidebar;