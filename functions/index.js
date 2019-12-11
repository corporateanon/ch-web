const functions = require('firebase-functions');
const admin = require('firebase-admin');

console.log('Starting my shiny new functions!');

admin.initializeApp();

exports.createUserRecord = require('./createUserRecord')(admin);
exports.createTaskHistoryRecord = require('./createTaskHistoryRecord')(admin);
exports.ssr = require('./ssr')(admin);
