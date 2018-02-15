// Actions
export const READ_FROM_DB = 'Sync/READ_FROM_DB';

// Reducer
export default function reducer(state = {}, action) {
    switch (action.type) {
        case READ_FROM_DB:
            return {
                ...state,
                days: action.payload
            };
        default:
            return state;
    }
}

// Action Creators
export function ReadFromDatabase(days) {
    return { type: READ_FROM_DB, payload: days };
}
