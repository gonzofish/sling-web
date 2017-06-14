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
import RoomSidebar from '../RoomSidebar';

type MessageType = {
  day: string;
  id: number,
  inserted_at: string
};
type RoomType = {
  id: number,
  name: string
};
type Props = {
  channel: any,
  connectToChannel: (socket: any, roomId: number) => void,
  createMessage: (channel: any, data: any) => void,
  currentUser: any,
  leaveChannel: (channel: any) => void,
  match: {
    params: {
      id: number
    }
  },
  messages: Array<MessageType>,
  presentUsers: Array<any>,
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
      <div style={ { display: 'flex', height: '100vh', width: '100%' }}>
        <RoomSidebar currentUser={ this.props.currentUser }
          presentUsers={ this.props.presentUsers }
          room={ this.props.room } />
        <div style={ { display: 'flex', flexDirection: 'column', width: '100%' }}>
          <RoomNavbar room={ this.props.room } />
          <MessageList messages={ this.props.messages } />
          <MessageForm onSubmit={ this.handleMessageCreate } />
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  channel: state.room.channel,
  currentUser: state.session.currentUser,
  messages: state.room.messages,
  presentUsers: state.session.presentUsers,
  room: state.room.currentRoom,
  socket: state.session.socket
}), {
  connectToChannel,
  createMessage,
  leaveChannel
})(Room);
