const initialState = {
    currentUser: {},
    isAuthenticated: false,
    willAuthenticate: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'AUTHENTICATION_REQUEST':
            return {
                ...state,
                willAuthenticate: true
            };
        case 'AUTHENTICATION_SUCCESS':
            return {
                ...state,
                currentUser: action.response.data,
                isAuthenticated: true,
                willAuthenticate: false
            };
        case 'AUTHENTICATION_FAILURE':
            return {
                ...state,
                willAuthenticate: false
            };
        case 'LOGOUT':
            return {
                ...state,
                currentUser: {},
                isAuthenticated: false,
                willAuthenticate: false
            };
        default:
            return state;
    }
}
