const functions = require('firebase-functions');

const writeToLocalHistory = ({
    admin,
    week,
    day,
    lesson,
    taskText,
    prevTaskText,
    user
}) => {
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
        })
        .then(() => {
            console.log('Local history record created');
            return null;
        });
};

const writeToGlobalHistory = ({
    admin,
    week,
    day,
    lesson,
    lessonName,
    taskText,
    prevTaskText,
    user
}) => {
    return admin
        .database()
        .ref(`/globalHistory`)
        .push()
        .set({
            type: 'UPDATE_TASK',
            timestamp: admin.database.ServerValue.TIMESTAMP,
            field: 'taskText',
            value: taskText || '',
            prevValue: prevTaskText || '',
            uid: user.uid,
            displayName: user.displayName || '',
            week,
            day,
            lesson,
            lessonName
        })
        .then(() => {
            console.log('Global history record created');
            return null;
        });
};

module.exports = admin =>
    functions.database
        .ref('/tasks/{week}/{day}/{lesson}')
        .onWrite((change, context) => {
            const { week, day, lesson } = context.params;
            const value = change.after.val();
            const prevValue = change.before.val();

            if (value === null || value === undefined) {
                console.log('value is null');
                return Promise.resolve();
            }
            const { taskText, taskTextLastUid, lessonName } = value;
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
                        }': w:${week}, d:${day}, l:${lesson} CHANGE '${prevTaskText}' -> '${
                            value.taskText
                        }'`
                    );

                    return Promise.all([
                        writeToLocalHistory({
                            admin,
                            week,
                            day,
                            lesson,
                            taskText,
                            prevTaskText,
                            user
                        }),
                        writeToGlobalHistory({
                            admin,
                            week,
                            day,
                            lesson,
                            lessonName,
                            taskText,
                            prevTaskText,
                            user
                        })
                    ]);
                });
        });
