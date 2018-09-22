import { dateToWeekId } from '../lib/dateUtils';
import { getFormValues } from 'redux-form';

// Actions
export const SET_WEEK = 'Week/SET_WEEK';
export const ADD_LESSON = 'Week/ADD_LESSON';
export const DELETE_LESSON = 'Week/DELETE_LESSON';

// Reducer
export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_WEEK:
            return {
                ...state,
                currentWeek: action.payload
            };
        default:
            return state;
    }
}

// Action Creators
export function SetWeek(weekId) {
    return { type: SET_WEEK, payload: weekId };
}

export function SetPresentWeek() {
    return { type: SET_WEEK, payload: dateToWeekId(new Date()) };
}
export function SetNextWeek() {
    return { type: SET_WEEK, payload: dateToWeekId(new Date()) + 1 };
}
export function AddLesson(week, day) {
    return { type: ADD_LESSON, payload: { week, day } };
}
export function DeleteLesson(week, day, lesson) {
    return { type: DELETE_LESSON, payload: { week, day, lesson } };
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
