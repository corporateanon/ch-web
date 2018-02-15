import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { readFromDb, writeToDb } from './db/sync';

import reducers from './reducers';
const history = createHistory();

const middleware = [routerMiddleware(history), writeToDb];

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
);

readFromDb(store.dispatch.bind(store));

export default store;
