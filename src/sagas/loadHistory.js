import { takeEvery, all, call, put } from 'redux-saga/effects';
import { database } from '../fb-app';
import { HistoryFetched, OPEN_DIALOG } from '../ducks/History';
import { historyByWeekDayLesson } from '../lib/ref';

export default function* loadHistory() {
    yield takeEvery(OPEN_DIALOG, function*({ payload: { week, day, lesson } }) {
        const lessonHistory = yield call(() =>
            database
                .ref(historyByWeekDayLesson(week, day, lesson))
                .once('value')
                .then(_ => _.val())
        );
        yield put(HistoryFetched(week, day, lesson, lessonHistory));
    });
}
