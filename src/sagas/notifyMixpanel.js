import { takeEvery, all } from 'redux-saga/effects';
import { track, identify, peopleSet } from '../mixpanel';
import { USER_AUTHENTICATED } from '../ducks/Auth';

function* watchRoute() {
    yield takeEvery('ROUTE_CHANGED', function({ payload: { name, match } }) {
        track(`Page View: ${name}`, { pageName: name, ...match });
    });
}

function* watchAuth() {
    yield takeEvery(USER_AUTHENTICATED, function({ payload }) {
        if (!payload) {
            return;
        }
        const { uid, displayName, email } = payload;
        identify(uid);
        peopleSet({ $email: email, $distinct_id: uid, $name: displayName });
    });
}

export default function* notifyMixpanel() {
    yield all([watchRoute(), watchAuth()]);
}
