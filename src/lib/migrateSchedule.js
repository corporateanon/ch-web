const migrateSchedule = schedule =>
    schedule.map(day =>
        day.map(lesson =>
            typeof lesson === 'string'
                ? {
                      lessonName: lesson
                  }
                : lesson
        )
    );
export default migrateSchedule;
