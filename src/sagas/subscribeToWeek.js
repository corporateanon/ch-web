import { fork, all, takeEvery } from 'redux-saga/effects';
import { writeFormFieldToDb, readFromDb } from './synchronize';
import { SET_WEEK } from '../ducks/Week';

export default function* subscribeToWeek() {
    let currentWeekId = null;
    let currentWeekDataReader = null;
    yield takeEvery(SET_WEEK, function*({ payload: weekId }) {
        if (currentWeekId !== weekId) {
            currentWeekId = weekId;
            console.log('Week changed to:', weekId);

            if (currentWeekDataReader) {
                currentWeekDataReader.cancel();
            }

            currentWeekDataReader = yield fork(
                readFromDb,
                'currentWeek',
                `/tasks/${weekId}`,
                days => ({
                    tasks: { [weekId]: days }
                })
            );
        }
    });
}
