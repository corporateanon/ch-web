import { database } from '../fb-app';
import { ReadFromDatabase } from '../ducks/Sync';
import { actionTypes as formActions, getFormInitialValues } from 'redux-form';
import { get } from 'lodash';

export const readFromDb = dispatch => {
    database.ref('/days').on('value', snapshot => {
        dispatch(ReadFromDatabase(snapshot.val()));
    });
};

export const writeToDb = store => next => action => {
    const state = store.getState();
    if (action.type === formActions.BLUR) {
        if (isFieldChanged(state, action)) {
            console.log('changed:', action.meta.field, action.payload);
        }
    }
    next(action);
};

const normalizeEmpty = value => {
    if (value === null || value === undefined || value === '') {
        return '';
    }
    return value;
};

const isFieldChanged = (state, action) => {
    const fieldValue = action.payload;
    const fieldName = action.meta.field;
    const fieldInitialValue = get(
        getFormInitialValues('currentWeek')(state),
        fieldName
    );
    return normalizeEmpty(fieldInitialValue) !== normalizeEmpty(fieldValue);
};

