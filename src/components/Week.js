import Grid from '@material-ui/core/Grid/Grid';
import { range } from 'lodash';
import { arrayOf, bool, func, number } from 'prop-types';
import React, { Component } from 'react';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';
import ClosedWeek from './ClosedWeek';
import Day from './Day';

class Week extends Component {
    static propTypes = {
        week: number.isRequired,
        isClosedWeek: bool.isRequired,
        isSyncing: bool.isRequired,
        isTaskTextEditable: bool.isRequired,
        isLessonNameEditable: bool.isRequired,
        onFillTasksFromSchedule: func.isRequired,
        showSingleDay: bool,
        day: number,
        onLessonMore: func,
        lessonsPerDay: arrayOf(number)
    };

    handleFillTasksFromSchedule = () => {
        const {
            props: { week, onFillTasksFromSchedule }
        } = this;
        onFillTasksFromSchedule(week);
    };

    render() {
        const {
            props: {
                day,
                isClosedWeek,
                isLessonNameEditable,
                isSyncing,
                isTaskTextEditable,
                lessonsPerDay,
                onLessonMore,
                onDeleteLesson,
                onAddLesson,
                showSingleDay,
                week
            },
            handleFillTasksFromSchedule
        } = this;

        if (isSyncing) {
            return '';
        }
        if (showSingleDay && day > 7) {
            return 'День не найден';
        }
        if (isClosedWeek && showSingleDay) {
            return 'День не найден';
        }
        const dayProps = {
            isTaskTextEditable,
            isLessonNameEditable,
            week,
            isExpanded: showSingleDay,
            onLessonMore,
            onDeleteLesson,
            onAddLesson
        };
        return isClosedWeek ? (
            <ClosedWeek
                canFill={isTaskTextEditable}
                onFillTasksFromSchedule={handleFillTasksFromSchedule}
            />
        ) : (
            <Grid container>
                {showSingleDay ? (
                    <Grid item xs={12}>
                        <Day
                            {...dayProps}
                            day={day}
                            lessonsCount={lessonsPerDay[day] || 0}
                        />
                    </Grid>
                ) : (
                    <Grid item xs={12}>
                        {range(0, 7).map(day => (
                            <Day
                                key={day}
                                {...dayProps}
                                day={day}
                                lessonsCount={lessonsPerDay[day] || 0}
                            />
                        ))}
                    </Grid>
                )}
            </Grid>
        );
    }
}

export default compose(
    reduxForm({
        form: 'currentWeek',
        enableReinitialize: true,
        destroyOnUnmount: false
    })
)(Week);
