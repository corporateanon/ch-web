import { all } from 'redux-saga/effects';
import { writeFormFieldToDb } from './synchronize';

export default function* syncDays() {
    yield all([
        writeFormFieldToDb({
            form: 'currentWeek',
            fieldPath: 'tasks.:week.:day.:lesson.lessonName',
            update: (state, value, week, day, lesson) => ({
                [`/tasks/${week}/${day}/${lesson}/lessonName`]: value
            })
        }),
        writeFormFieldToDb({
            form: 'currentWeek',
            fieldPath: 'tasks.:week.:day.:lesson.lessonLocation',
            update: (state, value, week, day, lesson) => ({
                [`/tasks/${week}/${day}/${lesson}/lessonLocation`]: value
            })
        }),
        writeFormFieldToDb({
            form: 'currentWeek',
            fieldPath: 'tasks.:week.:day.:lesson.taskText',
            update: (state, value, week, day, lesson) => {
                const { auth: { user: { uid } = {} } } = state;
                return {
                    [`/tasks/${week}/${day}/${lesson}/taskText`]: value,
                    [`/tasks/${week}/${day}/${lesson}/taskTextLastUid`]: uid
                };
            }
        })
    ]);
}
