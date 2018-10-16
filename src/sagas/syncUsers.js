import { all } from 'redux-saga/effects';
import { writeFormFieldToDb, readFromDb, actionTypes } from './synchronize';

export default function* syncUsers() {
    yield all([
        writeFormFieldToDb({
            form: 'users',
            actionType: actionTypes.BLUR,
            fieldPath: 'users.:uid.:field',
            update: (state, value, uid, field) => {
                return {
                    [`/users/${uid}/${field}`]: value
                };
            }
        }),
        writeFormFieldToDb({
            form: 'users',
            actionType: actionTypes.CHANGE,
            fieldPath: 'users.:uid.permissions.:field',
            update: (state, value, uid, field) => {
                return {
                    [`/users/${uid}/permissions/${field}`]: value
                };
            }
        }),
        readFromDb('users', '/users', users => ({ users }))
    ]);
}
