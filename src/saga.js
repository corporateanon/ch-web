import { all } from 'redux-saga/effects';

import syncDays from './sagas/syncDays';
import syncSchedule from './sagas/syncSchedule';
import pullUserMetadata from './sagas/pullUserMetadata';

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        syncDays(),
        syncSchedule(),
        pullUserMetadata()
    ]);
}
