import React, { Component } from 'react';
import Index from './containers/Index';
import Auth from './containers/Auth';
import Schedule from './containers/Schedule';
import './index.css';
import store from './store';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { BrowserRouter } from 'react-router-dom';

import { Route, Switch } from 'react-router';

const history = createHistory();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Index} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/schedule" component={Schedule} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
