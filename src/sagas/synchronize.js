import { select, takeEvery, call, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { actionTypes, getFormInitialValues, initialize } from 'redux-form';
import { get, partialRight } from 'lodash';
import { compose } from 'recompose';
import { database } from '../fb-app';

const normalizeEmpty = value => {
    if (value === null || value === undefined || value === '') {
        return '';
    }
    return value;
};

export function* writeFormFieldToDb(form, fieldRegex, makeEntry) {
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

        const entry = makeEntry(payload, ...matches);
        console.log('DB write:', entry.key, entry.value);

        database.ref(entry.key).set(entry.value);
    });
}

const readChannel = path => {
    return eventChannel(emitter => {
        database.ref(path).on('value', snapshot => {
            emitter({ value: snapshot.val() });
        });

        return () => {
            database.ref(path).off('value');
        };
    });
};

export function* readFromDb(form, path, makeData) {
    const chan = yield call(readChannel, path);

    console.log(`subscribing form "${form}" to path "${path}"`);
    try {
        while (true) {
            let { value } = yield take(chan);
            console.log('DB read:', path, value);
            yield put(initialize(form, makeData(value)));
        }
    } finally {
    }
}
