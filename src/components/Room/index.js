// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  connectToChannel,
  createMessage,
  leaveChannel
} from '../../actions/room';
import MessageForm from '../MessageForm';
import MessageList from '../MessageList';
import RoomNavbar from '../RoomNavbar';

type MessageType = {
  id: number
};
type RoomType = {
  id: number,
  name: string
};
type Props = {
  channel: any,
  connectToChannel: (socket: any, roomId: number) => void,
  createMessage: (channel: any, data: any) => void,
  leaveChannel: (channel: any) => void,
  match: {
    params: {
      id: number
    }
  },
  messages: Array<MessageType>,
  room: RoomType,
  socket: any
};

class Room extends Component {
  handleMessageCreate = (data) => this.props.createMessage(this.props.channel, data);
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

  componentWillUnmount() {
    this.props.leaveChannel(this.props.channel);
  }


  render() {
    return (
      <div style={ { display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
        <RoomNavbar room={ this.props.room } />
        <MessageList messages={ this.props.messages } />
        <MessageForm onSubmit={ this.handleMessageCreate } />
      </div>
    );
  }
}

export default connect((state) => ({
  channel: state.room.channel,
  messages: state.room.messages,
  room: state.room.currentRoom,
  socket: state.session.socket
}), {
  connectToChannel,
  createMessage,
  leaveChannel
})(Room);
