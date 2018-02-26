// Actions
const SET_TITLE = 'Navigation/SET_TITLE';

// Reducer
const initialState = { title: '' };
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_TITLE:
            return {
                ...state,
                title: action.payload
            };
        default:
            return state;
    }
}

// Action Creators
export const SetTitle = title => ({
    type: SET_TITLE,
    payload: title
});

// Selectors

export const getTitle = state => state.navigation.title;
