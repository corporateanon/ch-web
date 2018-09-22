import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Day from './Day';
import { reduxForm } from 'redux-form';
import { compose } from 'recompose';
import ClosedWeek from './ClosedWeek';
import { number, bool, func, arrayOf } from 'prop-types';
import { range } from 'lodash';

class Week extends Component {
    static propTypes = {
        week: number.isRequired,
        isClosedWeek: bool.isRequired,
        isSyncing: bool.isRequired,
        isTaskTextEditable: bool.isRequired,
        isLessonNameEditable: bool.isRequired,
        onFillSchedule: func.isRequired,
        showSingleDay: bool,
        day: number,
        onLessonMore: func,
        lessonsPerDay: arrayOf(number)
    };

    handleFillSchedule = () => {
        const {
            props: { week, onFillSchedule }
        } = this;
        onFillSchedule(week);
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
                showSingleDay,
                week
            },
            handleFillSchedule
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
            onLessonMore
        };
        return isClosedWeek ? (
            <ClosedWeek
                canFill={isTaskTextEditable}
                onFillSchedule={handleFillSchedule}
            />
        ) : (
            <Grid container>
                {showSingleDay ? (
                    <Grid item xs={12}>
                        <Day {...dayProps} day={day} />
                    </Grid>
                ) : (
                    <Fragment>
                        <Grid item xs={12}>
                            {range(0, 5).map(day => (
                                <Day
                                    key={day}
                                    {...dayProps}
                                    day={day}
                                    lessonsCount={lessonsPerDay[day]}
                                />
                            ))}
                        </Grid>
                    </Fragment>
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
