import { set } from 'object-path-immutable';
import { get, map, orderBy } from 'lodash';
import moment from 'moment';
// Actions
const HISTORY_FETCHED = 'History/HISTORY_FETCHED';
const OPEN_DIALOG = 'History/OPEN_DIALOG';
const CLOSE_DIALOG = 'History/CLOSE_DIALOG';

// Reducer
const defaultState = {
    items: {},
    current: null,
    dialogOpen: false
};
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case HISTORY_FETCHED: {
            const { week, day, value } = action.payload;
            return set(state, `items.${week}.${day}`, value);
        }
        case OPEN_DIALOG: {
            const { week, day, lesson } = action.payload;
            const current = get(state, `items.${week}.${day}.${lesson}`);
            return { ...state, current, dialogOpen: true };
        }
        case CLOSE_DIALOG: {
            return { ...state, dialogOpen: false };
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

export const OpenDialog = (week, day, lesson) => ({
    type: OPEN_DIALOG,
    payload: { week, day, lesson }
});

export const CloseDialog = (week, day, lesson) => ({
    type: CLOSE_DIALOG
});

export const isDialogOpen = state => {
    return state.history.dialogOpen;
};

export const getCurrentLessonHistory = state => {
    return orderBy(
        map(state.history.current, (item, id) => ({
            item: {
                ...item,
                dateStr: moment(item.timestamp).format('DD MMM HH:mm')
            },
            id
        })),
        [({ item }) => -item.timestamp]
    );
};
