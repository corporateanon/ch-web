import React, { Component } from 'react';
import Grid from 'material-ui/Grid/Grid';
import Day from './Day';
import { reduxForm } from 'redux-form';
import { compose } from 'recompose';
import ClosedWeek from './ClosedWeek';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFormValues } from 'redux-form';
import { FillSchedule } from '../ducks/Schedule';
import { canManageTasksLessons } from '../ducks/Auth';
import { isFormSyncing } from '../ducks/Sync';

const mapStateToProps = (state, props) => {
    const values = getFormValues('currentWeek')(state);
    const { week } = props;
    const { tasks: { [week]: weekValues = null } = {} } = values || {};
    return {
        formValues: getFormValues('currentWeek')(state),
        weekValues,
        canManageTasksLessons: canManageTasksLessons(state),
        isSyncing: isFormSyncing('currentWeek')(state)
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ FillSchedule }, dispatch);
};

class Week extends Component {
    handleFillSchedule = () => {
        const { props: { week, FillSchedule } } = this;
        FillSchedule(week);
    };
    render() {
        const {
            props: { weekValues, canManageTasksLessons, isSyncing },
            handleFillSchedule
        } = this;
        if (isSyncing) {
            return '';
        }
        return weekValues ? (
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Day day={0} title="Понедельник" />
                    <Day day={1} title="Вторник" />
                    <Day day={2} title="Среда" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Day day={3} title="Четверг" />
                    <Day day={4} title="Пятница" />
                </Grid>
            </Grid>
        ) : (
            <ClosedWeek
                canFill={canManageTasksLessons}
                onFillSchedule={handleFillSchedule}
            />
        );
    }
}

export default compose(
    reduxForm({
        form: 'currentWeek',
        enableReinitialize: true,
        destroyOnUnmount: false
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(Week);
