// Actions
export const FILL_SCHEDULE = 'Schedule/FILL_SCHEDULE';

// Reducer
export default function reducer(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

// Action Creators
export const FillSchedule = week => ({
    type: FILL_SCHEDULE,
    payload: week
});
