import { weekIdentifier, dateFromWeek } from './week-identifier';

export const dateToWeekId = d => {
    return weekIdentifier(d);
};

export const currentWeekId = () => {
    return dateToWeekId(new Date());
};

export const weekAndDayToDate = (weekId, day) => {
    const date = dateFromWeek(weekId);
    day = day | 0;
    date.setTime(date.getTime() + day * 24 * 1000 * 3600);
    return date;
};
