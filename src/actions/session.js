import { reset } from 'redux-form';
import { Socket } from 'phoenix';

import api from '../api';
import { fetchUserRooms } from './rooms';

const API_URL = process.env.REACT_APP_API_URL;
const WEBSOCKET_URL = API_URL.replace(/(https|http)/, 'ws').replace('/api', '');

export const authenticate = () => {
    return (dispatch) => {
        dispatch({ type: 'AUTHENTICATION_REQUEST' });

        api.post('/sessions/refresh')
            .then((response) => {
                setCurrentUser(dispatch, response);
            })
            .catch(() => {
                localStorage.removeItem('token');
                window.location = '/login';
            });
    };
};

export const connectToSocket = (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const socket = new Socket(`${ WEBSOCKET_URL }/socket`, {
    params: { token }
  });

  socket.connect();
  dispatch({
    socket,
    type: 'SOCKET_CONNECTED'
  });
}

export const login = (data, router) => {
    return (dispatch) => api.post('/sessions', data)
        .then((response) => {
            setCurrentUser(dispatch, response);
            dispatch(reset('login'));
            router.history.push('/');
        });
};

export const logout = (router) => {
    return (dispatch) => api.delete('/sessions')
        .then(() => {
            localStorage.removeItem('token');
            dispatch({ type: 'LOGOUT' });
            router.history.push('/login');
        });
};

const setCurrentUser = (dispatch, response) => {
    localStorage.setItem('token', JSON.stringify(response.meta.token));
    dispatch({
        response,
        type: 'AUTHENTICATION_SUCCESS'
    });
    dispatch(fetchUserRooms(response.data.id));
    connectToSocket(dispatch);
};

export const signup = (data, router) => {
    return (dispatch) => api.post('/users', data)
        .then((response) => {
            setCurrentUser(dispatch, response);
            dispatch(reset('signup'));
            router.history.push('/');
        });
};

export const unauthenticate = () => ({ type: 'AUTHENTICATION_FAILURE' });
