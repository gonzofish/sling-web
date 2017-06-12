// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  connectToChannel,
  leaveChannel
} from '../../actions/room';

type RoomType = {
  id: number,
  name: string
};
type Props = {
  channel: any,
  connectToChannel: (socket: any, roomId: number) => void,
  leaveChannel: (channel: any) => void,
  match: {
    params: {
      id: number
    }
  },
  room: RoomType,
  socket: any
};

class Room extends Component {
  props: Props;

  componentDidMount() {
    this.props.connectToChannel(this.props.socket, this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.leaveChannel(this.props.channel);
      this.props.connectToChannel(nextProps.socket, nextProps.match.params.id);
    }

    if (!this.props.socket && nextProps.socket) {
      this.props.connectToChannel(nextProps.socket, nextProps.match.params.id);
    }
  }

  componentWIllUnmount() {
    this.props.leaveChannel(this.props.channel);
  }

  render() {
    return (
      <div>{ this.props.room.name }</div>
    );
  }
}

export default connect((state) => ({
  channel: state.room.channel,
  room: state.room.currentRoom,
  socket: state.session.socket
}), {
  connectToChannel,
  leaveChannel
})(Room);
