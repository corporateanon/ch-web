import { all } from 'redux-saga/effects';

import syncDays from './sagas/syncDays';
import syncSchedule from './sagas/syncSchedule';
import pullUserMetadata from './sagas/pullUserMetadata';
import subscribeToWeek from './sagas/subscribeToWeek';
import fillSchedule from './sagas/fillSchedule';
import notifyMixpanel from './sagas/notifyMixpanel';
import loadHistory from './sagas/loadHistory';
import pullLog from './sagas/pullLog';
import lessonOperations from './sagas/lessonOperations';
import syncUsers from './sagas/syncUsers';
import mobileBlurHelper from './sagas/mobileBlurHelper';

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        mobileBlurHelper(),
        fillSchedule(),
        syncDays(),
        syncSchedule(),
        pullUserMetadata(),
        subscribeToWeek(),
        notifyMixpanel(),
        loadHistory(),
        pullLog(),
        lessonOperations(),
        syncUsers()
    ]);
}
