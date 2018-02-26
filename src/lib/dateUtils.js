import { weekIdentifier, dateFromWeek } from 'week-identifier';

export const dateToWeekId = d => {
    return weekIdentifier(d);
};

export const currentWeekId = () => {
    return dateToWeekId(new Date());
};

