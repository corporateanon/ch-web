import { takeEvery } from 'redux-saga/effects';
import track from '../mixpanel';

export default function* notifyMixpanel() {
    yield takeEvery('ROUTE_CHANGED', function({ payload: { name, match } }) {
        track(`Page View: ${name}`, { pageName: name, ...match });
    });
}
