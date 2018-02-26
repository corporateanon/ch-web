import React, { Component, Fragment } from 'react';
import Paper from 'material-ui/Paper/Paper';
import { FieldArray, Field } from 'redux-form';
import TextField from 'material-ui/TextField/TextField';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid/Grid';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography/Typography';
import weekDays from '../lib/weekDays';

const styles = theme => {
    return {
        textField: {},
        paper: {
            padding: 4 * theme.spacing.unit,
            marginBottom: theme.spacing.unit
        },
        title: {
            marginBottom: 4 * theme.spacing.unit
        }
    };
};

const RFTextField = props => (
    <TextField fullWidth {...props} {...props.input} />
);

class ScheduleLesson extends Component {
    addLesson = fields => fields.push('');
    render() {
        const { props: { fields, classes }, addLesson } = this;

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
                            <Field
                                component={RFTextField}
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
                            <Button onClick={addLesson.bind(null, fields)}>
                                Добавить
                            </Button>
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
        const { props: { day, classes } } = this;
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
                        component={StyledScheduleLesson}
                    />
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(ScheduleDay);
