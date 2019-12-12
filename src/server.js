import React from 'react';
import store from './serverStore';
// import { weekIdentifier } from './lib/week-identifier';
import { initialize } from 'redux-form';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import Index from './containers/Index';

export default class Server {
    constructor() {}
    mainPage(weekId, tasks) {
        store.dispatch(
            initialize('currentWeek', { tasks: { [weekId]: tasks } })
        );

        console.log(store.getState());
        const routeProps = {
            match: {
                url: '/',
                params: {}
            }
        };

        const Wrapper = ({ children }) => (
            <Provider store={store}>{children}</Provider>
        );
        const html = renderToString(
            <Wrapper>
                <Index {...routeProps} />
            </Wrapper>
        );
        console.log(html);
    }
}
