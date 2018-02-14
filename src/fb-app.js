import * as firebase from 'firebase';
import conf from './firebase-config.json';
const app = firebase.initializeApp(conf);
const database = app.database();

const auth = firebase.auth();

export { database, auth };
export default app;
