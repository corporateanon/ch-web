import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import {createBrowserHistory as createHistory} from 'history';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import rootSaga from './saga';

const history = createHistory();

const sagaMiddleware = createSagaMiddleware();

const middleware = [routerMiddleware(history), sagaMiddleware];

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;
