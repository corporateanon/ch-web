import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Router, Route, browserHistory } from 'react-router';

import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import reducers from './reducers';
const history = createHistory();

const middleware = [routerMiddleware(history)];

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
