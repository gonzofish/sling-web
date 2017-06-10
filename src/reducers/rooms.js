const initialState = {
    all: [],
    currentUserRooms: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'CREATE_ROOM_SUCCESS':
            return {
                ...state,
                all: [ action.response.data, ...state.all],
                currentUserRooms: [ action.response.data, ...state.currentUserRooms]
            };
        case 'FETCH_ROOMS_SUCCESS':
            return {
                ...state,
                all: action.response.data
            };
        case 'FETCH_USER_ROOMS_SUCCESS':
            return {
                ...state,
                currentUserRooms: action.response.data
            };
        case 'ROOM_JOINED':
            return {
                ...state,
                currentUserRooms: [ action.response.data, ...state.currentUserRooms]
            };
        default:
            return state;
    }
};
