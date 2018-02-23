import { all, takeEvery } from 'redux-saga/effects';
import { writeFormFieldToDb, readFromDb } from './synchronize';
import { SET_WEEK } from '../ducks/Week';

export default function* subscribeToWeek() {
    let prevWeekId = null;
    yield takeEvery(SET_WEEK, function*({ payload: weekId }) {
        if (prevWeekId !== weekId) {
            console.log('Week changed to:', weekId);
            yield readFromDb('currentWeek', `/tasks/${weekId}`, days => ({
                [weekId]: days
            }));
        }
    });
}
