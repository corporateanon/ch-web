const functions = require('firebase-functions');
const express = require('express');

module.exports = admin => {
    const app = express();
    console.log('Starting Express server');

    app.get('/', (req, res) => res.send('Hello world!'));

    return functions.https.onRequest(app);
};
