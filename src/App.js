import React, { Component } from 'react';
import Index from './containers/Index';
import Auth from './containers/Auth';
import Schedule from './containers/Schedule';
import './index.css';
import store from './store';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

const history = createHistory();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/" component={Index} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/schedule" component={Schedule} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
