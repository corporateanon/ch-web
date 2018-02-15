import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import SyncReducer from './ducks/Sync';

export default combineReducers({
    form: formReducer,
    routing: routerReducer,
    SyncReducer: SyncReducer
});
