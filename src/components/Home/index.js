// @flow
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createRoom, fetchRooms, joinRoom } from '../../actions/rooms';

import Navbar from '../Navbar';
import NewRoomForm from '../NewRoomForm';
import RoomListItem from '../RoomListItem';

const styles = StyleSheet.create({
  card: {
    margin: '2rem auto',
    maxWidth: '500px',
    padding: '3rem 4rem'
  }
});

type Room = {
  id: number,
  name: string
};

type Props = {
  createRoom: (Object, Object) => void,
  currentUserRooms: Array<Room>,
  fetchRooms: () => void,
  joinRoom: (number, Object) => void,
  rooms: Array<Room>
};

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  handleNewRoomSubmit = (data) => this.props.createRoom(data, this.context.router);
  handleRoomJoin = (roomId) => this.props.joinRoom(roomId, this.context.router);
  props: Props;

  componentDidMount() {
    this.props.fetchRooms();
  }

  renderRooms() {
    const roomIds = this.props.currentUserRooms.map((room) => room.id);

    return this.props.rooms.map((room) =>
      <RoomListItem currentUserRoomIds={ roomIds }
        key={ room.id }
        onRoomJoin={ this.handleRoomJoin }
        room={ room } />
    );
  }

  render() {
    return (
      <div style={ { flex: '1' } }>
        <Navbar />
        <div className={ `card ${ css(styles.card) }` }>
          <h3 style={ { marginBottom: '2rem', textAlign: 'center' } }>Create a New Room</h3>
          <NewRoomForm onSubmit={ this.handleNewRoomSubmit } />
        </div>

        <div className={ `card ${ css(styles.card) }` }>
          <h3 style={ { marginBottom: '2rem', textAlign: 'center' } }>Join a Room</h3>
          { this.renderRooms() }
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    currentUserRooms: state.rooms.currentUserRooms,
    rooms: state.rooms.all
  }),
  { createRoom, fetchRooms, joinRoom }
)(Home);
