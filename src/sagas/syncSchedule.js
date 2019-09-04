import { all } from 'redux-saga/effects';
import { writeFormFieldToDb, readFromDb } from './synchronize';
import migrateSchedule from '../lib/migrateSchedule';

export default function* syncDays() {
    yield all([
        writeFormFieldToDb({
            form: 'schedule',
            fieldPath: 'schedule[:day][:lesson].lessonName',
            update: (state, value, day, lesson) => ({
                [`/schedule/${day}/${lesson}/lessonName`]: value
            })
        }),
        writeFormFieldToDb({
            form: 'schedule',
            fieldPath: 'schedule[:day][:lesson].lessonLocation',
            update: (state, value, day, lesson) => ({
                [`/schedule/${day}/${lesson}/lessonLocation`]: value
            })
        }),
        readFromDb('schedule', '/schedule', schedule => ({
            schedule: migrateSchedule(schedule)
        }))
    ]);
}
