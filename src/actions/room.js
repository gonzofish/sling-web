import { reset } from 'redux-form';
import { Presence } from 'phoenix';

export const connectToChannel = (socket, roomId) => {
  return (dispatch) => {
    if (!socket) { return false; }

    const channel = socket.channel(`rooms:${ roomId }`);

    trackMessages(channel, dispatch);
    trackPresence(channel, dispatch);
    joinChannel(channel, dispatch);

    return false;
  };
};

const trackMessages = (channel, dispatch) => {
  channel.on('message_created', (message) => dispatch({
    message,
    type: 'MESSAGE_CREATED'
  }));
};

const trackPresence = (channel, dispatch) => {
  let presences = {};

  channel.on('presence_state', (state) => {
    presences = Presence.syncState(presences, state);
    syncPresentUsers(dispatch, presences);
  });
  channel.on('presence_diff', (diff) => {
    presences = Presence.syncDiff(presences, diff);
    syncPresentUsers(dispatch, presences);
  });
};

const joinChannel = (channel, dispatch) => {
  channel.join().receive('ok', (response) => {
    dispatch({
      channel,
      response,
      type: 'ROOM_CONNECTED_TO_CHANNEL'
    });
  });
};

export const createMessage = (channel, data) => {
  return (dispatch) => new Promise((resolve, reject) =>
    channel.push('new_message', data)
      .receive('ok', () => resolve(dispatch(reset('newMessage'))))
      .receive('error', () => reject())
  );
};

export const leaveChannel = (channel) => {
  return (dispatch) => {
    if (channel) {
      channel.leave();
    }
    dispatch({ type: 'USER_LEFT_ROOM' });
  }
};

export const syncPresentUsers = (dispatch, presences) => {
  const presentUsers = Presence.list(presences, (id, { metas: [first] }) => first.user);

  dispatch({ presentUsers, type: 'ROOM_PRESENCE_UPDATE' });
};
