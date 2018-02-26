import { all } from 'redux-saga/effects';
import { writeFormFieldToDb } from './synchronize';

export default function* syncDays() {
    yield all([
        writeFormFieldToDb(
            'currentWeek',
            /^tasks\.(\d+)\.(\d+)\.(\d+)\.(taskText|lessonName)$/,
            (value, week, day, lesson, lessonProperty) => ({
                key: `/tasks/${week}/${day}/${lesson}/${lessonProperty}`,
                value
            })
        )
    ]);
}
