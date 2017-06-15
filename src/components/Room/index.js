// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  connectToChannel,
  createMessage,
  leaveChannel,
  loadOlderMessages
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
  loadOlderMessages: (id: number, data: { last_seen_id: number }) => void,
  loadingOlderMessages: boolean,
  match: {
    params: {
      id: number
    }
  },
  messages: Array<MessageType>,
  pagination: {
    page_number: number,
    page_size: number,
    total_entries: number,
    total_pages: number
  },
  presentUsers: Array<any>,
  room: RoomType,
  socket: any
};

class Room extends Component {
  messageList: any;
  props: Props;

  handleLoadMore = () => this.props.loadOlderMessages(
    this.props.match.params.id,
    { last_seen_id: this.props.messages[0].id }
  );
  handleMessageCreate = (data) => {
    this.props.createMessage(this.props.channel, data);
    this.messageList.scrollToBottom();
  };

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
    const moreMessages = this.props.pagination.total_pages > this.props.pagination.page_number;

    return (
      <div style={ { display: 'flex', height: '100vh', width: '100%' }}>
        <RoomSidebar currentUser={ this.props.currentUser }
          presentUsers={ this.props.presentUsers }
          room={ this.props.room } />
        <div style={ { display: 'flex', flexDirection: 'column', width: '100%' }}>
          <RoomNavbar room={ this.props.room } />
          <MessageList loadingOlderMessages={ this.props.loadingOlderMessages }
            messages={ this.props.messages }
            moreMessages={ moreMessages }
            onLoadMore={ this.handleLoadMore }
            ref={ (c) => { this.messageList = c; } } />
          <MessageForm onSubmit={ this.handleMessageCreate } />
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  channel: state.room.channel,
  currentUser: state.session.currentUser,
  loadingOlderMessages: state.room.loadingOlderMessages,
  messages: state.room.messages,
  pagination: state.room.pagination,
  presentUsers: state.session.presentUsers,
  room: state.room.currentRoom,
  socket: state.session.socket
}), {
  connectToChannel,
  createMessage,
  leaveChannel,
  loadOlderMessages
})(Room);
