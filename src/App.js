import React, { Component } from 'react';
import Page from './containers/Page';
import './index.css';
import store from './store';
import { Provider } from 'react-redux';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Page />
            </Provider>
        );
    }
}

export default App;
