import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import Index from './containers/Index';
import Auth from './containers/Auth';
import Schedule from './containers/Schedule';
import './index.css';
import store from './store';
import Route from './components/router/TrackableRoute';
import Log from './containers/Log';
import Users from './containers/Users';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={Index}
                            name="ThisWeek"
                        />
                        <Route
                            exact
                            path="/next"
                            component={Index}
                            name="NextWeek"
                        />
                        <Route
                            exact
                            path="/prev"
                            component={Index}
                            name="PrevWeek"
                        />
                        <Route
                            exact
                            path="/tasks/week/:week/day/:day"
                            component={Index}
                            name="Day"
                        />
                        <Route path="/auth" component={Auth} name="Auth" />
                        <Route
                            path="/schedule"
                            component={Schedule}
                            name="Schedule"
                        />
                        <Route path="/log" component={Log} name="Log" />
                        <Route
                            path="/users"
                            component={Users}
                            name="Users"
                        />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
