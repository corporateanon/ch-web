import React, { Component, Fragment } from 'react';
import Index from './containers/Index';
import Main from './containers/Main';
import Auth from './containers/Auth';
import './index.css';
import store from './store';
import { Provider } from 'react-redux';
import Paper from 'material-ui/Paper';

import app from './fb-app';
import withStyles from 'material-ui/styles/withStyles';

import createHistory from 'history/createBrowserHistory';
import { Route, IndexRoute, Switch } from 'react-router';
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware,
    push
} from 'react-router-redux';

const history = createHistory();

class App extends Component {
    render() {
        const { props: { classes } } = this;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/" component={Index} />
                        <Route path="/auth" component={Auth} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
