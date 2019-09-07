import { take, call, select, takeEvery } from 'redux-saga/effects';
import {
    FILL_TASKS_FROM_SCHEDULE,
    FILL_SCHEDULE_FROM_TASKS
} from '../ducks/Schedule';
import { USER_METADATA_LOADED } from '../ducks/Auth';
import { database } from '../fb-app';
import * as ref from '../lib/ref';
import migrateSchedule from '../lib/migrateSchedule';
import { getWeek } from '../ducks/Week';
import { enqueueSnackbar } from '../services/notifier';

const makeTasksFromSchedule = schedule => {
    return Object.keys(schedule).map(dayOfWeek => {
        const lessons = schedule[dayOfWeek];
        return lessons.map(({ lessonName, lessonLocation }) => ({
            lessonName: lessonName || null,
            lessonLocation: lessonLocation || null
        }));
    });
};

const makeScheduleFromTasks = tasks =>
    tasks.map(day =>
        day.map(({ lessonName = null, lessonLocation = null }) => ({
            lessonName,
            lessonLocation
        }))
    );

function* convertScheduleToTasks(weekId) {
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

    const newTasks = makeTasksFromSchedule(migrateSchedule(schedule));
    yield call(() => database.ref(ref.tasksByWeek(weekId)).set(newTasks));
}

function* convertTasksToSchedule(weekId) {
    const weekTasks = (yield call(() =>
        database.ref(ref.tasksByWeek(weekId)).once('value')
    )).val();
    if (!weekTasks) {
        throw new Error('EMPTY_SOURCE');
    }
    const newSchedule = makeScheduleFromTasks(weekTasks);
    yield call(() => database.ref(ref.schedule()).set(newSchedule));
    yield call(() =>
        enqueueSnackbar('Расписание сохранено!', {
            variant: 'success',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center'
            }
        })
    );
}

function* fillTasksFromSchedule({ payload: weekId }) {
    try {
        yield convertScheduleToTasks(weekId);
    } catch (e) {
        console.error(e);
    }
    console.log('done');
}

function* fillScheduleFromTasks() {
    const weekId = yield select(getWeek);
    try {
        yield convertTasksToSchedule(weekId);
    } catch (e) {
        console.error(e);
    }
    console.log('done');
}

export default function* fillSchedule() {
    yield take(USER_METADATA_LOADED);
    yield takeEvery(FILL_TASKS_FROM_SCHEDULE, fillTasksFromSchedule);
    yield takeEvery(FILL_SCHEDULE_FROM_TASKS, fillScheduleFromTasks);
}
