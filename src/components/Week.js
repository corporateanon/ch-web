import React, { Component } from 'react';
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
        onFillSchedule: func.isRequired
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
                isLessonNameEditable
            },
            handleFillSchedule
        } = this;
        if (isSyncing) {
            return '';
        }
        const dayProps = { isTaskTextEditable, isLessonNameEditable, week };
        return isClosedWeek ? (
            <ClosedWeek
                canFill={isTaskTextEditable}
                onFillSchedule={handleFillSchedule}
            />
        ) : (
            <Grid container>
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
