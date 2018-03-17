import { all } from 'redux-saga/effects';
import { writeFormFieldToDb } from './synchronize';

export default function* syncDays() {
    yield all([
        writeFormFieldToDb({
            form: 'currentWeek',
            fieldRegex: /^tasks\.(\d+)\.(\d+)\.(\d+)\.lessonName$/,
            update: (state, value, week, day, lesson) => ({
                [`/tasks/${week}/${day}/${lesson}/lessonName`]: value
            })
        }),
        writeFormFieldToDb({
            form: 'currentWeek',
            fieldRegex: /^tasks\.(\d+)\.(\d+)\.(\d+)\.taskText$/,
            update: (state, value, week, day, lesson) => {
                const { auth: { user: { uid } = {} } } = state;
                debugger;
                return {
                    [`/tasks/${week}/${day}/${lesson}/taskText`]: value,
                    [`/tasks/${week}/${day}/${lesson}/taskTextLastUid`]: uid
                };
            }
        })
    ]);
}
