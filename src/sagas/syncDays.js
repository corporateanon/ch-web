import { all } from 'redux-saga/effects';
import { writeFormFieldToDb, readFromDb } from './synchronize';

export default function* syncDays() {
    yield all([
        writeFormFieldToDb(
            'currentWeek',
            /^days\[(\d+)\]\.lessons\[(\d+)\]\.(taskText|lessonName)$/,
            (value, day, lesson, lessonProperty) => ({
                key: `/days/${day}/lessons/${lesson}/${lessonProperty}`,
                value
            })
        ),
        readFromDb('currentWeek', '/days', days => ({ days }))
    ]);
}
