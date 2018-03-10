const functions = require('firebase-functions');
const admin = require('firebase-admin');

const creds = functions.config().firebase;
creds.credential = admin.credential.cert(require('./service-account.json'));

admin.initializeApp(creds);

exports.createUserRecord = functions.auth.user().onCreate(event => {
    const { email, displayName, uid } = event.data;
    admin
        .database()
        .ref(`/users/${uid}`)
        .set({
            email,
            displayName,
            uid,
            permissions: {
                manageSchedule: false,
                manageUsers: false,
                manageTasks: false,
                manageTasksLessons: false
            }
        });
});
