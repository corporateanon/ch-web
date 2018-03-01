const dateA = new Date(
    new Date('January 5, 1970 00:00:00 +0000').getTime() +
        new Date().getTimezoneOffset() * 60000
);

export function weekIdentifier(date) {
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
    var lastDayOfWeekZero = dateA.getTime() - 1;
    // Number of week from our starting date
    var weekNumberdiff = Math.ceil(
        (target.getTime() - lastDayOfWeekZero) / (24 * 3600 * 1000 * 7)
    );

    return weekNumberdiff;
}

export function dateFromWeek(weekIdentifier) {
    if (isNaN(parseFloat(weekIdentifier))) {
        return NaN;
    } else {
        // Starting date point for our sequence
        var firstDayOfWeekOne, mondayOfWeek;
        mondayOfWeek = firstDayOfWeekOne = new Date(dateA);
        if (weekIdentifier > 0) {
            mondayOfWeek = new Date(
                (weekIdentifier - 1) * (24 * 3600 * 1000 * 7) +
                    firstDayOfWeekOne.getTime()
            );
        }
        return mondayOfWeek;
    }
}
