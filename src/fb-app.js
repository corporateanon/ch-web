import * as firebase from 'firebase';
import config from './config';
let app, database, auth;

if (typeof process === undefined || !process.versions.node) {
    app = firebase.initializeApp(config.firebase);
    database = app.database();

    auth = firebase.auth();
}

export { database, auth };
export default app;
