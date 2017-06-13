// @flow
import React from 'react';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  navbar: {
    background: '#fff',
    borderBottom: '1px solid rgb(240, 240, 240)',
    padding: '15px'
  }
});

type Props = {
  room: { name: string }
};

const RoomNavbar = ({ room }: Props) =>
  <nav className={ css(styles.navbar) }>
    <div>#{ room.name }</div>
  </nav>;

export default RoomNavbar;
