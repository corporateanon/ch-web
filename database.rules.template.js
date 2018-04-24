const {
    all,
    authenticated,
    hasPermission,
    equalsMyUid
} = require('./db-rules/helpers');

module.exports = {
    rules: {
        history: {
            '.read': true
        },
        globalHistory: {
            '.read': true
        },
        schedule: {
            '.read': true,
            '.write': all(authenticated(), hasPermission('manageSchedule'))
        },
        tasks: {
            '.read': true,
            $weekId: {
                '.write': all(
                    authenticated(),
                    hasPermission('manageTasksLessons')
                ),
                $dayOfWeek: {
                    '.write': all(
                        authenticated(),
                        hasPermission('manageTasksLessons')
                    ),
                    $lesson: {
                        '.write': all(
                            authenticated(),
                            hasPermission('manageTasksLessons')
                        ),
                        taskTextLastUid: {
                            '.write': all(
                                authenticated(),
                                equalsMyUid(),
                                hasPermission('manageTasks')
                            )
                        },
                        taskText: {
                            '.write': all(
                                authenticated(),
                                hasPermission('manageTasks')
                            )
                        },
                        lessonName: {
                            '.write': all(
                                authenticated(),
                                hasPermission('manageTasksLessons')
                            )
                        }
                    }
                }
            }
        },
        users: {
            $uid: {
                '.read': '$uid === auth.uid',
                '.write': all(authenticated(), hasPermission('manageUsers'))
            }
        }
    }
};
