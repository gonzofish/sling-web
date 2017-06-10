import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import rooms from './rooms';
import session from './session';

const appReducer = combineReducers({
    form,
    rooms,
    session
});

export default (state, action) => {
    let reduceState;

    if (action.type !== 'LOGOUT') {
        reduceState = state;
    }

    return appReducer(reduceState, action);
};
