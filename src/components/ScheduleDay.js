import React, { Component, Fragment } from 'react';
import Paper from 'material-ui/Paper/Paper';
import { FieldArray } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography/Typography';
import weekDays from '../lib/weekDays';
import RFTextField from './RFTextField';
import { compose } from 'recompose';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { canManageSchedule } from '../ducks/Auth';

const mapStateToProps = (state, props) => {
    return { canManageSchedule: canManageSchedule(state) };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

const styles = theme => {
    return {
        paper: {
            padding: 4 * theme.spacing.unit,
            marginBottom: theme.spacing.unit
        },
        title: {
            marginBottom: 4 * theme.spacing.unit
        }
    };
};

class ScheduleLesson extends Component {
    addLesson = fields => fields.push('');
    render() {
        const { props: { fields, classes, readonly }, addLesson } = this;

        return (
            <Fragment>
                {!fields.length && (
                    <Grid item xs={12}>
                        <Typography color="textSecondary">
                            Нет уроков
                        </Typography>
                    </Grid>
                )}
                {fields.map((field, index) => {
                    const label = `Lesson ${index + 1}`;
                    return (
                        <Grid item xs={12} key={field}>
                            <RFTextField
                                disabled={readonly}
                                className={classes.textField}
                                name={field}
                                label={label}
                            />
                        </Grid>
                    );
                })}

                <Grid item xs={12}>
                    <Grid container justify="flex-end">
                        <Grid item xs={3}>
                            {!readonly && (
                                <Button onClick={addLesson.bind(null, fields)}>
                                    Добавить
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

const StyledScheduleLesson = withStyles(styles)(ScheduleLesson);

class ScheduleDay extends Component {
    render() {
        const { props: { day, classes, canManageSchedule } } = this;
        return (
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="title" className={classes.title}>
                            {weekDays[day]}
                        </Typography>
                    </Grid>
                    <FieldArray
                        name={`schedule[${day}]`}
                        readonly={!canManageSchedule}
                        component={StyledScheduleLesson}
                    />
                </Grid>
            </Paper>
        );
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(ScheduleDay);
