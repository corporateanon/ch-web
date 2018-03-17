import immutable from 'object-path-immutable';
// Actions
const HISTORY_FETCHED = 'History/HISTORY_FETCHED';

// Reducer
const defaultState = {
    items: {}
};
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case HISTORY_FETCHED: {
            const { week, day, value } = action.payload;
            return immutable.set(state, `items.${week}.${day}`, value);
        }
        default:
            return state;
    }
}

// Action Creators
export const HistoryFetched = (week, day, value) => ({
    type: HISTORY_FETCHED,
    payload: {
        week,
        day,
        value
    }
});
