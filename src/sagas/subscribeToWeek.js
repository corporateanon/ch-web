import { put, fork, takeEvery } from 'redux-saga/effects';
import { readFromDb } from './synchronize';
import { SET_WEEK } from '../ducks/Week';
import * as ref from '../lib/ref';
import { currentWeekId as getCurrentWeek } from '../lib/dateUtils';
import { SetWeek } from '../ducks/Week';

export default function* subscribeToWeek() {
    let currentWeekId = null;
    let currentWeekDataReader = null;

    yield takeEvery('ROUTE_CHANGED', function*({
        payload: { name, match: { params: { week } } }
    }) {
        let weekId;
        if (name === 'ThisWeek') {
            weekId = getCurrentWeek();
        } else if (name === 'NextWeek') {
            weekId = getCurrentWeek() + 1;
        } else if (name === 'Day') {
            weekId = parseInt(week, 10);
        } else {
            return;
        }

        if (currentWeekId !== weekId) {
            currentWeekId = weekId;

            if (currentWeekDataReader) {
                currentWeekDataReader.cancel();
            }

            currentWeekDataReader = yield fork(
                readFromDb,
                'currentWeek',
                ref.tasksByWeek(weekId),
                days => ({
                    tasks: { [weekId]: days }
                })
            );
            yield put(SetWeek(weekId));
        }
    });
}
