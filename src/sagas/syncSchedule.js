import { all } from 'redux-saga/effects';
import { writeFormFieldToDb, readFromDb } from './synchronize';

export default function* syncDays() {
    yield all([
        writeFormFieldToDb({
            form: 'schedule',
            fieldPath: 'schedule[:day][:lesson]',
            update: (state, value, day, lesson) => ({
                [`/schedule/${day}/${lesson}`]: value
            })
        }),
        readFromDb('schedule', '/schedule', schedule => ({ schedule }))
    ]);
}
