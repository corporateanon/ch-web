export const dateToWeekId = d => {
    return weekIdentifier(d);
};

export const currentWeekId = () => {
    return dateToWeekId(new Date());
};

function weekIdentifier(date) {
    var instance;

    if (typeof date === 'string' && date.length) {
        instance = new Date(date);
    } else if (date instanceof Date) {
        instance = date;
    } else {
        instance = new Date();
    }
    // Create a copy of this date object
    var target = new Date(instance.valueOf());
    // Starting date point for our sequence
    var lastDayOfWeekZero = new Date('January 5, 1970 00:00:00');
    // Number of week from our starting date
    var weekNumberdiff = Math.ceil(
        (target.getTime() - lastDayOfWeekZero.getTime() - 1) /
            (24 * 3600 * 1000 * 7)
    );

    return weekNumberdiff;
}

function dateFromWeek(weekIdentifier) {
    if (isNaN(parseFloat(weekIdentifier))) {
        return NaN;
    } else {
        // Starting date point for our sequence
        var firstDayOfWeekOne, mondayOfWeek;
        mondayOfWeek = firstDayOfWeekOne = new Date('January 5, 1970 00:00:00');
        if (weekIdentifier > 0) {
            mondayOfWeek = new Date(
                (weekIdentifier - 1) * (24 * 3600 * 1000 * 7) +
                    firstDayOfWeekOne.getTime()
            );
        }
        return mondayOfWeek;
    }
}
