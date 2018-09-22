import { takeLatest, call, select } from 'redux-saga/effects';
import { database } from '../fb-app';
import * as ref from '../lib/ref';
import { ADD_LESSON, getWeekLessonsPerDay, DELETE_LESSON } from '../ducks/Week';


function* doAddLesson({ payload: { week, day } }) {
    const lessonsCountPerDay = yield select(getWeekLessonsPerDay);
    const lessonsCount = lessonsCountPerDay[day] || 0;
    const iWeek = parseInt(week, 10);
    const iDay = parseInt(day, 10);
    yield call(() =>
        database
            .ref(ref.taskByWeekDayLesson(iWeek, iDay, lessonsCount))
            .set({ lessonName: '' })
    );
}
function* doDeleteLesson({ payload: { week, day, lesson } }) {
    const iWeek = parseInt(week, 10);
    const iDay = parseInt(day, 10);
    const iLesson = parseInt(lesson, 10);
    yield call(() =>
        database.ref(ref.taskByWeekDayLesson(iWeek, iDay, iLesson)).remove()
    );
}

export default function* lessonOperations() {
    yield takeLatest(ADD_LESSON, doAddLesson);
    yield takeLatest(DELETE_LESSON, doDeleteLesson);
}
