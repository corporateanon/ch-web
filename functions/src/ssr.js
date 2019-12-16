import React from 'react';
import { renderToString } from 'react-dom/server';
import * as functions from 'firebase-functions';
import express from 'express';
import { weekIdentifier } from './lib/weekId';
import Server from '../../src/server';

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

        return tasks;
    }

    const app = express();
    app.get('/', async (req, res) => {
        res.set('Cache-Control', 'public, max-age=300, s-maxage=300');

        const tasks = await getCurrentWeekTasks();
        const server = new Server();
        res.send(server.currentWeekPage(tasks));
    });
    return functions.https.onRequest(app);
};
