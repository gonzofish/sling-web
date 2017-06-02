import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

const appReducer = combineReducers({
    form
});

export default (state, action) => {
    let reduceState;

    if (action.type !== 'LOGOUT') {
        reduceState = state;
    }

    return appReducer(reduceState, action);
};
