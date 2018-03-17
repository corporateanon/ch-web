import { takeEvery, all, call, put } from 'redux-saga/effects';
import { database } from '../fb-app';
import { HistoryFetched } from '../ducks/History';

function* watchRoute() {
    yield takeEvery('ROUTE_CHANGED', function*({ payload: { name, match } }) {
        if (name !== 'Day') {
            return;
        }

        const { week, day } = match.params;
        const dayHistory = yield call(() =>
            database
                .ref(`/history/${week}/${day}`)
                .once('value')
                .then(_ => _.val())
        );
        yield put(HistoryFetched(week, day, dayHistory));
    });
}

export default function* loadHistory() {
    yield all([watchRoute()]);
}
