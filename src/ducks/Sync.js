// Actions
const SYNC_STARTED = 'Sync/SYNC_STARTED';
const SYNC_COMPLETED = 'Sync/SYNC_COMPLETED';

// Reducer
const initialState = {
    formsSyncing: {}
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SYNC_STARTED:
            return {
                ...state,
                formsSyncing: {
                    ...state.formsSyncing,
                    [action.payload.form]: true
                }
            };
        case SYNC_COMPLETED:
            return {
                ...state,
                formsSyncing: {
                    ...state.formsSyncing,
                    [action.payload.form]: false
                }
            };
        default:
            return state;
    }
}

// Action Creators
export const SyncStarted = (form, path) => ({
    type: SYNC_STARTED,
    payload: { form, path }
});
export const SyncCompleted = (form, path) => ({
    type: SYNC_COMPLETED,
    payload: { form, path }
});

//Selectors:

export const isFormSyncing = form => state => {
    return state.sync.formsSyncing[form] !== false;
};
