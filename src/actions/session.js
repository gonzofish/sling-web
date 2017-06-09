import { reset } from 'redux-form';
import api from '../api';

const setCurrentUser = (dispatch, response) => {
    localStorage.setItem('token', JSON.stringify(response.meta.token));
    dispatch({
        response,
        type: 'AUTHENTICATION_SUCCESS'
    })
};

export const login = (data, router) => {
    return (dispatch) => api.post('/sessions', data)
        .then((response) => {
            setCurrentUser(dispatch, response);
            dispatch(reset('login'));
            router.history.push('/');
        });
};

export const signup = (data, router) => {
    return (dispatch) => api.post('/users', data)
        .then((response) => {
            setCurrentUser(dispatch, response);
            dispatch(reset('signup'));
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
