const functions = require('firebase-functions');

module.exports = admin =>
    functions.auth.user().onCreate(user => {
        const { email, displayName, uid } = user;
        return admin
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
                    manageTasksLessons: false,
                    viewLog: false
                }
            });
    });
