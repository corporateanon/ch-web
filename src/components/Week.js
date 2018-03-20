import React, { Component, Fragment } from 'react';
import Grid from 'material-ui/Grid/Grid';
import Day from './Day';
import { reduxForm } from 'redux-form';
import { compose } from 'recompose';
import ClosedWeek from './ClosedWeek';
import { number, bool, func } from 'prop-types';

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
        onLessonMore: func
    };

    handleFillSchedule = () => {
        const { props: { week, onFillSchedule } } = this;
        onFillSchedule(week);
    };

    render() {
        const {
            props: {
                week,
                isClosedWeek,
                isSyncing,
                isTaskTextEditable,
                isLessonNameEditable,
                showSingleDay,
                day,
                onLessonMore
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
                        <Grid item xs={12} md={6}>
                            <Day {...dayProps} day={0} />
                            <Day {...dayProps} day={1} />
                            <Day {...dayProps} day={2} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Day {...dayProps} day={3} />
                            <Day {...dayProps} day={4} />
                            <Day {...dayProps} day={5} />
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
