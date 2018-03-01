import { take, call } from 'redux-saga/effects';
import { FILL_SCHEDULE } from '../ducks/Schedule';
import { USER_METADATA_LOADED } from '../ducks/Auth';
import { database } from '../fb-app';
import * as ref from '../lib/ref';

const makeTasksFromSchedule = schedule => {
    return Object.keys(schedule).map(dayOfWeek => {
        const lessons = schedule[dayOfWeek];
        return lessons.map(lesson => ({
            lessonName: lesson
        }));
    });
};

function* writeScheduleToDatabase(weekId) {
    const weekTasks = (yield call(() =>
        database.ref(ref.tasksByWeek(weekId)).once('value')
    )).val();

    if (weekTasks) {
        throw new Error('ALREADY_FILLED');
    }

    const schedule = (yield call(() =>
        database.ref(ref.schedule()).once('value')
    )).val();
    if (!schedule || !Object.keys(schedule).length) {
        throw new Error('EMPTY_SOURCE');
    }

    const newTasks = makeTasksFromSchedule(schedule);
    yield call(() => database.ref(ref.tasksByWeek(weekId)).set(newTasks));
}

export default function* syncDays() {
    yield take(USER_METADATA_LOADED);
    while (true) {
        const { payload: weekId } = yield take(FILL_SCHEDULE);
        try {
            yield writeScheduleToDatabase(weekId);
        } catch (e) {
            console.error(e);
        }
        console.log('done');
    }
}
