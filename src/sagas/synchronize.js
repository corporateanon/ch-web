import { select, takeEvery, call, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { actionTypes, getFormInitialValues, initialize } from 'redux-form';
import { get, partialRight } from 'lodash';
import { compose } from 'recompose';
import { database } from '../fb-app';
import { SyncStarted, SyncCompleted } from '../ducks/Sync';

const normalizeEmpty = value => {
    if (value === null || value === undefined || value === '') {
        return '';
    }
    return value;
};

const trim = value => {
    if (typeof value === 'string') {
        return value.trim();
    }
    return value;
};

export function* writeFormFieldToDb({ form, fieldRegex, update }) {
    yield takeEvery(actionTypes.BLUR, function*({ payload, meta }) {
        if (meta.form !== form) {
            return;
        }
        const matchResult = meta.field.match(fieldRegex);
        if (!matchResult) {
            return;
        }
        const [, ...matches] = matchResult;

        const initialSelector = compose(
            partialRight(get, meta.field),
            getFormInitialValues(form)
        );

        const initial = yield select(initialSelector);
        if (normalizeEmpty(initial) === normalizeEmpty(payload)) {
            return;
        }
        const state = yield select();

        const entry = update(state, trim(payload), ...matches);
        console.log('DB write:', entry);

        database.ref().update(entry);
    });
}

const readChannel = path => {
    return eventChannel(emitter => {
        database.ref(path).on('value', snapshot => {
            emitter({ value: snapshot.val() });
        });

        return () => {
            console.log(`unsubscribing from ${path}`);
            database.ref(path).off('value');
        };
    });
};

export function* readFromDb(form, path, makeData) {
    const chan = yield call(readChannel, path);

    console.log(`subscribing form "${form}" to path "${path}"`);
    yield put(SyncStarted(form, path));
    try {
        while (true) {
            let { value } = yield take(chan);
            console.log('DB read:', path, value);
            yield put(initialize(form, makeData(value)));
            yield put(SyncCompleted(form, path));
        }
    } finally {
        chan.close();
    }
}
