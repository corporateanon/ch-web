import React from 'react';
import { renderToString } from 'react-dom/server';
import * as functions from 'firebase-functions';
import express from 'express';
import { weekIdentifier } from './lib/weekId';

/**
 * @param {import("firebase-admin")} admin
 */
export default admin => {
    async function getCurrentWeekTasks() {
        const weekId = weekIdentifier(new Date());
        if (!weekId) {
            throw new Error('No weekId');
        }
        const tasks = await admin
            .database()
            .ref(`/tasks/${weekId}`)
            .once('value');

        return { tasks };
    }

    const app = express();
    app.get('/', async (req, res) => res.json(await getCurrentWeekTasks()));
    app.get('/react', async (req, res) => {
        const App = () => <h1>hello world</h1>;
        res.send(renderToString(<App />));
    });
    return functions.https.onRequest(app);
};
