import { database } from '../fb-app';
import { takeEvery, select, call, put } from 'redux-saga/effects';
import { USER_AUTHENTICATED, UserMetadataLoaded } from '../ducks/Auth';
import * as ref from '../lib/ref';

export default function*() {
    yield takeEvery(USER_AUTHENTICATED, function*() {
        const user = yield select(state => state.auth.user);
        if (!user) {
            return;
        }
        const snapshot = yield call(() =>
            database.ref(ref.userByUid(user.uid)).once('value')
        );
        yield put(UserMetadataLoaded(snapshot.val()));
    });
}
