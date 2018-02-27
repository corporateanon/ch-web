const { all, authenticated, hasPermission } = require('./db-rules/helpers');

module.exports = {
    rules: {
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
                '.write': all(
                    authenticated(),
                    hasPermission('manageUsers')
                )
            }
        }
    }
};
