import { database } from '../fb-app';
import { takeEvery, call, put } from 'redux-saga/effects';
import * as ref from '../lib/ref';
import { LogLoaded } from '../ducks/Log';

const isRouteChangedToLogPage = ({ type, payload: { name } = {} }) =>
    type === 'ROUTE_CHANGED' && name === 'Log';

const getValue = () =>
    database
        .ref(ref.log())
        .limitToLast(1000)
        .once('value')
        .then(snapshot => snapshot.val());

export default function*() {
    yield takeEvery(isRouteChangedToLogPage, function*() {
        const data = yield call(getValue);
        yield put(LogLoaded(data));
    });
}
