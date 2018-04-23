const functions = require('firebase-functions');
const admin = require('firebase-admin');

// const creds = functions.config().firebase;
// const env = functions.config().application.env;
// console.log('Starting with aplication.env=' + env);
// creds.credential = admin.credential.cert(require('./keys/' + env + '.json'));
console.log('Starting my shiny new functions!');

// admin.initializeApp(creds);
admin.initializeApp();

exports.createUserRecord = functions.auth.user().onCreate(user => {
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
                manageTasksLessons: false
            }
        });
});

exports.createTaskHistoryRecord = functions.database
    .ref('/tasks/{week}/{day}/{lesson}')
    .onWrite((change, context) => {
        const { week, day, lesson } = context.params;
        const value = change.after.val();
        const prevValue = change.before.val()

        if (value === null || value === undefined) {
            console.log('value is null');
            return Promise.resolve();
        }
        const { taskText, taskTextLastUid } = value;
        const { taskText: prevTaskText } = prevValue || {};
        if (taskText === prevTaskText) {
            console.log('taskText is not changed');
            return Promise.resolve();
        }
        if (!taskTextLastUid) {
            console.log(
                `taskTextLastUid is null;\nvalue=${JSON.stringify(value)}`
            );
            return Promise.resolve();
        }

        return admin
            .database()
            .ref(`/users/${taskTextLastUid}`)
            .once('value')
            .then(userSnapshot => userSnapshot.val())
            .then(user => {
                if (!user) {
                    throw new Error('User not found');
                }
                console.log(
                    `Task Updated by '${
                        user.displayName
                    }': w:${week}, d:${day}, l:${lesson} CHANGE '${
                        prevTaskText
                    }' -> '${value.taskText}'`
                );

                return admin
                    .database()
                    .ref(`/history/${week}/${day}/${lesson}`)
                    .push()
                    .set({
                        timestamp: admin.database.ServerValue.TIMESTAMP,
                        field: 'taskText',
                        value: taskText || '',
                        prevValue: prevTaskText || '',
                        uid: user.uid,
                        displayName: user.displayName || ''
                    });
            });
    });
