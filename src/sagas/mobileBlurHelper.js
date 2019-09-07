import { takeEvery, put, select } from 'redux-saga/effects';
import { SET_EDIT_MODE } from '../ducks/Week';
import { blur, getFormValues } from 'redux-form';
import { get } from 'lodash';

const FORM = 'currentWeek';

const getActiveField = ({ form: { [FORM]: { active } = {} } = {} }) =>
    active || null;

function* onEditModeChanged() {
    const formActiveField = yield select(getActiveField);
    //For example: "tasks.2592.0.0.taskText"
    if (formActiveField) {
        const formValues = yield select(getFormValues(FORM));
        const fieldValue = get(formValues, formActiveField);
        yield put(blur(FORM, formActiveField, fieldValue, true));
    }
}

export default function* mobileBlurHelper() {
    yield takeEvery(SET_EDIT_MODE, onEditModeChanged);
}
