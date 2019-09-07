import React, { Component, useEffect } from 'react';
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
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { theme } from './components/theme';
import { capture } from './services/notifier';

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <SnackbarProvider maxSnack={3}>
                        <AppRouter />
                    </SnackbarProvider>
                </Provider>
            </ThemeProvider>
        );
    }
}

const AppRouter = () => {
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        capture(enqueueSnackbar);
    });
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Index} name="ThisWeek" />
                <Route exact path="/next" component={Index} name="NextWeek" />
                <Route exact path="/prev" component={Index} name="PrevWeek" />
                <Route
                    exact
                    path="/tasks/week/:week/day/:day"
                    component={Index}
                    name="Day"
                />
                <Route path="/auth" component={Auth} name="Auth" />
                <Route path="/schedule" component={Schedule} name="Schedule" />
                <Route path="/log" component={Log} name="Log" />
                <Route path="/users" component={Users} name="Users" />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
