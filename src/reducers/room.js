const initialState = {
  channel: null,
  currentRoom: {},
  loadingOlderMessages: false,
  messages: [],
  pagination: {
    page_number: 0,
    page_size: 0,
    total_entries: 0,
    total_pages: 0
  },
  presentUsers: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_MESSAGE_FAILURE':
      return {
        ...state,
        loadingOlderMessages: false
      }
    case 'FETCH_MESSAGE_REQUEST':
      return {
        ...state,
        loadingOlderMessages: true
      };
    case 'FETCH_MESSAGE_SUCCESS':
      return {
        ...state,
        loadingOlderMessages: false,
        messages: [
          ...action.response.data.reverse(),
          ...state.messages
        ],
        pagination: action.response.pagination
      };
    case 'MESSAGE_CREATED':
      return {
        ...state,
        messages: [
          ...state.messages,
          action.message
        ]
      };
    case 'ROOM_CONNECTED_TO_CHANNEL':
      return {
        ...state,
        channel: action.channel,
        currentRoom: action.response.room,
        messages: action.response.messages.reverse(),
        pagination: action.response.pagination
      };
    case 'ROOM_PRESENCE_UPDATE':
      return {
        ...state,
        presentUsers: action.presentUsers
      };
    case 'USER_LEFT_ROOM':
      return initialState;
    default:
      return state;
  }
};
