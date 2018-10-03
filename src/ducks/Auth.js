// Actions
export const USER_AUTHENTICATED = 'Auth/USER_AUTHENTICATED';
export const USER_METADATA_LOADED = 'Auth/USER_METADATA_LOADED';

// Reducer
const initialState = {
    permissions: {},
    user: null
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case USER_AUTHENTICATED: {
            return {
                ...state,
                user: action.payload
            };
        }
        case USER_METADATA_LOADED: {
            const { payload: { permissions = {} } = {} } = action;
            return {
                ...state,
                permissions
            };
        }
        default: {
            return state;
        }
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

// Selectors

export const canManageSchedule = state => {
    return !!state.auth.permissions.manageSchedule;
};

export const canManageTasks = state => {
    return !!state.auth.permissions.manageTasks;
};

export const canManageUsers = state => {
    return !!state.auth.permissions.manageUsers;
};

export const canManageTasksLessons = state => {
    return !!state.auth.permissions.manageTasksLessons;
};

export const canViewLog = state => {
    return !!state.auth.permissions.viewLog;
};

export const getUid = state => {
    return state.auth.user ? state.auth.user.uid : null;
};
