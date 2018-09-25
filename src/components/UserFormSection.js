import React from 'react';
import RFTextField from './RFTextField';
import Paper from '@material-ui/core/Paper';
import { FormSection } from 'redux-form';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { Grid, FormControlLabel } from '@material-ui/core';
import RFSwitch from './RFSwitch';

const UserFormSection = ({ id, classes }) => {
    return (
        <FormSection name={id}>
            <Paper className={classes.main}>
                <Grid container spacing={24} direction="column">
                    <Grid item>
                        <RFTextField label="Display Name" name="displayName" />
                    </Grid>
                    <Grid item>
                        <RFTextField disabled label="Email" name="email" />
                    </Grid>
                    <Grid item>
                        <RFTextField disabled label="UID" name="uid" />
                    </Grid>
                    <Grid item container direction="column">
                        <FormControlLabel
                            label="Редактирование заданий"
                            control={
                                <RFSwitch name="permissions.manageTasks" />
                            }
                        />
                        <FormControlLabel
                            label="Просмотр истории"
                            control={<RFSwitch name="permissions.viewLog" />}
                        />
                        <FormControlLabel
                            label="Редактирование названий уроков"
                            control={
                                <RFSwitch name="permissions.manageTasksLessons" />
                            }
                        />
                        <FormControlLabel
                            label="Управление расписанием"
                            control={
                                <RFSwitch name="permissions.manageSchedule" />
                            }
                        />
                        <FormControlLabel
                            label="Управление пользователями"
                            control={
                                <RFSwitch name="permissions.manageUsers" />
                            }
                        />
                    </Grid>
                </Grid>
            </Paper>
        </FormSection>
    );
};

export default compose(
    withStyles(theme => ({
        main: {
            padding: theme.spacing.unit * 4,
            marginBottom: theme.spacing.unit * 2
        }
    }))
)(UserFormSection);
