import { set } from 'object-path-immutable';
import { get, map, orderBy } from 'lodash';
import moment from 'moment';
// Actions
export const HISTORY_FETCHED = 'History/HISTORY_FETCHED';
export const OPEN_DIALOG = 'History/OPEN_DIALOG';
export const CLOSE_DIALOG = 'History/CLOSE_DIALOG';

// Reducer
const defaultState = {
    items: {},
    currentWDL: null,
    dialogOpen: false
};
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case HISTORY_FETCHED: {
            const { week, day, lesson, value } = action.payload;
            return set(state, `items.${week}.${day}.${lesson}`, value);
        }
        case OPEN_DIALOG: {
            const { week, day, lesson } = action.payload;
            return {
                ...state,
                dialogOpen: true,
                currentWDL: `${week}.${day}.${lesson}`
            };
        }
        case CLOSE_DIALOG: {
            return { ...state, dialogOpen: false };
        }
        default:
            return state;
    }
}

// Action Creators
export const HistoryFetched = (week, day, lesson, value) => ({
    type: HISTORY_FETCHED,
    payload: {
        week,
        day,
        lesson,
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
    if (!state.history.currentWDL) {
        return [];
    }
    return orderBy(
        map(get(state.history.items, state.history.currentWDL), (item, id) => ({
            item: {
                ...item,
                dateStr: moment(item.timestamp).format('DD MMM HH:mm')
            },
            id
        })),
        [({ item }) => -item.timestamp]
    );
};
