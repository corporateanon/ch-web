import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import Index from './containers/Index';
import Auth from './containers/Auth';
import Schedule from './containers/Schedule';
import './index.css';
import store from './store';

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
