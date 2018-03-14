import * as firebase from 'firebase';
import config from './config';
const app = firebase.initializeApp(config.firebase);
const database = app.database();

const auth = firebase.auth();

export { database, auth };
export default app;
