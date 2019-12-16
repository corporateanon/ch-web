import { MemoryRouter } from 'react-router';
import React from 'react';
import store from './serverStore';
import { weekIdentifier } from './lib/week-identifier';
import { initialize } from 'redux-form';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import Index from './containers/Index';
import { SetWeek } from './ducks/Week';
import { SyncCompleted } from './ducks/Sync';
import _ from 'lodash';
import { ServerStyleSheets } from '@material-ui/styles';
import appHtml from '../build/app.html';

export default class Server {
    constructor() {}
    _weekPage(weekId, _tasks) {
        console.log('1', JSON.stringify(_tasks));
        const tasks = this._tasksFromPseudoArrays(_tasks);
        console.log('2', JSON.stringify(tasks));
        store.dispatch(
            initialize('currentWeek', { tasks: { [weekId]: tasks } })
        );
        store.dispatch(SetWeek(weekId));
        store.dispatch(SyncCompleted('currentWeek'));

        const routeProps = {
            match: {
                url: '/',
                params: {}
            }
        };
        const sheets = new ServerStyleSheets();

        const Wrapper = ({ children }) => (
            <Provider store={store}>{children}</Provider>
        );
        const html = renderToString(
            sheets.collect(
                <Wrapper>
                    <MemoryRouter>
                        <Index {...routeProps} />
                    </MemoryRouter>
                </Wrapper>
            )
        );

        const css = sheets.toString();

        const state = store.getState();
        return this._renderFullPage(html, css, state);
    }
    /**
     * converts tasks from firebase format {"0":{"0":{...}}, "1":{"0":{...}}}
     */
    _tasksFromPseudoArrays(_tasks) {
        const tasks = JSON.parse(JSON.stringify(_tasks));
        function getLength(pseudoArray) {
            const keys = Object.keys(pseudoArray)
                .map(key => parseInt(key))
                .filter(key => !isNaN(key));
            if (!keys.length) {
                return 0;
            }
            return _(keys).max() + 1;
        }
        function from(pseudoArray, ...args) {
            const pseudoArrayWithLength = {
                ...pseudoArray,
                length: getLength(pseudoArray)
            };
            return Array.from(pseudoArrayWithLength, ...args);
        }

        return from(tasks, it => from(it));
    }
    currentWeekPage(tasks) {
        const weekId = weekIdentifier(new Date());
        return this._weekPage(weekId, tasks);
    }
    _renderFullPage(html, css, state) {
        return appHtml.replace(
            '<div id="root"></div>',
            `<div id="root">
            <style id="jss-server-side">${css}</style>
            ${html}
            <script>window.$ssrReduxState=${JSON.stringify(state)}</script>
            </div>`
        );
    }
}
