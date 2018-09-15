import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import auth from './ducks/Auth';
import week from './ducks/Week';
import navigation from './ducks/Navigation';
import sync from './ducks/Sync';
import history from './ducks/History';
import log from './ducks/Log';

export default combineReducers({
    form: formReducer,
    routing: routerReducer,
    auth,
    week,
    navigation,
    sync,
    history,
    log
});
