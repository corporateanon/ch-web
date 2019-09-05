import React from 'react';
import RFTextField from './RFTextField';
import Paper from '@material-ui/core/Paper';
import { FormSection } from 'redux-form';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { Grid, FormControlLabel } from '@material-ui/core';
import RFSwitch from './RFSwitch';

const UserFormSection = ({ id, classes, myUid }) => {
    const isMyself = myUid === id;

    return (
        <FormSection name={id}>
            <Paper className={classes.main}>
                <Grid container spacing={24} direction="column">
                    <Grid item>
                        <RFTextField label="Имя" name="displayName" />
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
                            label="Управление событиями"
                            control={
                                <RFSwitch name="permissions.manageEvents" />
                            }
                        />
                        <FormControlLabel
                            label="Управление пользователями"
                            title={
                                isMyself
                                    ? 'Вы не можете выстрелить себе в ногу'
                                    : null
                            }
                            control={
                                <RFSwitch
                                    disabled={isMyself}
                                    name="permissions.manageUsers"
                                />
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
            padding: theme.spacing(4),
            marginBottom: theme.spacing(2)
        }
    }))
)(UserFormSection);
