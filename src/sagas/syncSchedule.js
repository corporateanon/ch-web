import { all } from 'redux-saga/effects';
import { writeFormFieldToDb, readFromDb } from './synchronize';

export default function* syncDays() {
    yield all([
        writeFormFieldToDb(
            'schedule',
            /^schedule\[(\d+)\]\[(\d+)\]$/,
            (value, day, lesson) => ({
                key: `/schedule/${day}/${lesson}`,
                value
            })
        ),
        readFromDb('schedule', '/schedule', schedule => ({ schedule }))
    ]);
}
