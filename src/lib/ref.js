import assert from 'assert';

const assertNum = v => {
    assert.equal(typeof v, 'number');
    assert.ok(v >= 0);
};

const assertStr = v => {
    assert.equal(typeof v, 'string');
    assert.ok(v.length > 0);
};

////

export const tasksByWeek = weekId => {
    assertNum(weekId);
    return `/tasks/${weekId}`;
};
export const taskByWeekDayLesson = (weekId, day, lesson) => {
    assertNum(weekId);
    assertNum(day);
    assertNum(lesson);
    return `/tasks/${weekId}/${day}/${lesson}`;
};

export const userByUid = uid => {
    assertStr(uid);
    return `/users/${uid}`;
};

export const schedule = () => {
    return `/schedule`;
};

export const historyByWeekDayLesson = (week, day, lesson) => {
    return `/history/${week}/${day}/${lesson}`;
};

export const log = _ => '/globalHistory';
