import { orderBy } from 'lodash';
import { compose } from 'recompose';

const orderLogItems = compose(Object.values, _ =>
    orderBy(_, ['timestamp'], ['desc'])
);

// Actions
export const LOG_LOADED = 'Log/LOG_LOADED';

// Reducer
const defaultState = {
    items: []
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case LOG_LOADED:
            return { ...state, items: orderLogItems(action.payload) };
        default:
            return state;
    }
}

// Action Creators
export const LogLoaded = records => ({
    type: LOG_LOADED,
    payload: records
});

// Selectors

export const selectLogItems = state => state.log.items;
