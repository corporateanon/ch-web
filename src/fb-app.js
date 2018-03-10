import * as firebase from 'firebase';
import confByEnv from './firebase-config.json';

const env =
    process.env.NODE_ENV === 'development'
        ? 'staging'
        : process.env.REACT_APP_ENV;

console.log({ env });

const app = firebase.initializeApp(confByEnv[env]);
const database = app.database();

const auth = firebase.auth();

export { database, auth };
export default app;
