import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import auth from './ducks/Auth';

export default combineReducers({
    form: formReducer,
    routing: routerReducer,
    auth
});
