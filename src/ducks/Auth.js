// Actions
export const USER_AUTHENTICATED = 'Auth/USER_AUTHENTICATED';
export const USER_METADATA_LOADED = 'Auth/USER_METADATA_LOADED';

// Reducer
export default function reducer(state = {}, action) {
    switch (action.type) {
        case USER_AUTHENTICATED:
            return {
                ...state,
                user: action.payload
            };
        case USER_METADATA_LOADED:
            return {
                ...state,
                permissions: action.payload.permissions
            };
        default:
            return state;
    }
}

// Action Creators
export const UserAuthenticated = user => ({
    type: USER_AUTHENTICATED,
    payload: user
});

export const UserMetadataLoaded = user => ({
    type: USER_METADATA_LOADED,
    payload: user
});
