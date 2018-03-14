// Actions
const SET_TITLE = 'Navigation/SET_TITLE';

// Reducer
const initialState = {
    title: '',
    routeName: null,
    routePath: null,
    routeUrl: null,
    routeParams: {}
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_TITLE:
            return {
                ...state,
                title: action.payload
            };
        case 'ROUTE_CHANGED':
            return {
                ...state,
                routeName: action.payload.name,
                routePath: action.payload.match.path,
                routeUrl: action.payload.match.url,
                routeParams: action.payload.match.params
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
export const getRouteName = state => state.navigation.routeName;
export const getRouteUrl = state => state.navigation.routeUrl;
export const getRoutePath = state => state.navigation.routePath;
export const getRouteParams = state => state.navigation.routeParams;
