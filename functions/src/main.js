import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import createUserRecord_f from './createUserRecord';
import createTaskHistoryRecord_f from './createTaskHistoryRecord';
import ssr_f from './ssr';

admin.initializeApp(functions.config().firebase);
console.log('Starting my shiny new functions!');

const createUserRecord = createUserRecord_f(admin);
const createTaskHistoryRecord = createTaskHistoryRecord_f(admin);
const ssr = ssr_f(admin);

export { createUserRecord, createTaskHistoryRecord, ssr };
