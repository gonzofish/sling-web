import api from '../api';

export const createRoom = (room, router) => {
    return (dispatch) => api.post('/rooms', room)
        .then((response) => {
            dispatch({ response, type: 'CREATE_ROOM_SUCCESS' });
            router.transitionTo(`/r/${ response.data.id }`);
        });
};

export const fetchRooms = () => {
    return (dispatch) => api.fetch('/rooms')
        .then((response) => {
            dispatch({ response, type: 'FETCH_ROOMS_SUCCESS' })
        });
};

export const fetchUserRooms = (userId) => {
    return (dispatch) => api.fetch(`/users/${ userId }/rooms`)
        .then((response) => {
            dispatch({ response, type: 'FETCH_USER, ROOMS_SUCCESS' })
        });
};

export const joinRoom = (roomId, router) => {
    return (dispatch) => api.post(`/rooms/${ roomId }/join`)
        .then((response) => {
            dispatch({ response, type: 'ROOM_JOINED' });
            router.transitionTo(`/r/${ response.data.id }`);
        });
};