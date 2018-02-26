import React, { Component, Fragment } from 'react';
import TextField from 'material-ui/TextField/TextField';
import Grid from 'material-ui/Grid/Grid';
import { number } from 'prop-types';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getWeek } from '../ducks/Week';
import { canManageTasks, canManageTasksLessons } from '../ducks/Auth';
import RFTextField from './RFTextField';

const mapStateToProps = (state, props) => {
    return {
        week: getWeek(state),
        canManageTasks: canManageTasks(state),
        canManageTasksLessons: canManageTasksLessons(state)
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

class Lesson extends Component {
    static propTypes = {
        lesson: number.isRequired,
        day: number.isRequired
    };
    render() {
        const {
            props: { day, lesson, week, canManageTasks, canManageTasksLessons }
        } = this;
        const prefix = `tasks.${week}.${day}.${lesson}`;
        const lessonNameKey = `${prefix}.lessonName`;
        const taskTextKey = `${prefix}.taskText`;
        return (
            <Fragment>
                <Grid item xs={3}>
                    <Field
                        disabled={!canManageTasksLessons}
                        week={week}
                        name={lessonNameKey}
                        component={RFTextField}
                    />
                </Grid>
                <Grid item xs={9}>
                    <Field
                        disabled={!canManageTasks}
                        week={week}
                        name={taskTextKey}
                        component={RFTextField}
                    />
                </Grid>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lesson);
