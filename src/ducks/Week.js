import { getFormValues } from 'redux-form';

// Actions
export const SET_WEEK = 'Week/SET_WEEK';
export const ADD_LESSON = 'Week/ADD_LESSON';
export const DELETE_LESSON = 'Week/DELETE_LESSON';
export const SET_EDIT_MODE = 'Week/SET_EDIT_MODE';

const initialState = {
    currentWeek: null,
    editMode: {
        tasks: false,
        full: false
    }
};

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_WEEK:
            return {
                ...state,
                currentWeek: action.payload
            };
        case SET_EDIT_MODE:
            return {
                ...state,
                editMode: {
                    ...state.editMode,
                    tasks: !!action.payload.tasks,
                    full: !!action.payload.full
                }
            };
        default:
            return state;
    }
}

// Action Creators
export function SetWeek(weekId) {
    return { type: SET_WEEK, payload: weekId };
}
export function AddLesson(week, day) {
    return { type: ADD_LESSON, payload: { week, day } };
}
export function DeleteLesson(week, day, lesson) {
    return { type: DELETE_LESSON, payload: { week, day, lesson } };
}
export function SetEditMode(editMode) {
    return { type: SET_EDIT_MODE, payload: editMode };
}

// Selectors

export const getWeek = state => {
    return state.week.currentWeek;
};

export const getWeekValues = state => {
    const formValues = getFormValues('currentWeek')(state);
    const week = getWeek(state);
    return formValues
        ? formValues.tasks
            ? formValues.tasks[week]
            : undefined
        : undefined;
};

export const isClosedWeek = state => {
    return getWeekValues(state) === null;
};

export const getWeekLessonsPerDay = state => {
    const weekValues = getWeekValues(state);
    return (weekValues || []).map(_ => (_ ? _.length : 0));
};
export const getEditMode = state => {
    return state.week.editMode;
};
