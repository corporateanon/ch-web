import { all } from 'redux-saga/effects';
import { writeFormFieldToDb, readFromDb } from './synchronize';

export default function* syncUsers() {
    yield all([
        writeFormFieldToDb({
            form: 'users',
            fieldRegex: /^users\.(.+)$/,
            update: (state, value, path) => {
                return {
                    [`/users/${path.replace(/\./g, '/')}`]: value
                };
            }
        }),
        readFromDb('users', '/users', users => ({ users }))
    ]);
}
