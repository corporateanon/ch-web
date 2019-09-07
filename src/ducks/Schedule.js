// Actions
export const FILL_TASKS_FROM_SCHEDULE = 'Schedule/FILL_TASKS_FROM_SCHEDULE';
export const FILL_SCHEDULE_FROM_TASKS = 'Schedule/FILL_SCHEDULE_FROM_TASKS';

// Reducer
export default function reducer(state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}

// Action Creators
export const FillTasksFromSchedule = week => ({
    type: FILL_TASKS_FROM_SCHEDULE,
    payload: week
});

export const FillScheduleFromTasks = () => ({
    type: FILL_SCHEDULE_FROM_TASKS
});
