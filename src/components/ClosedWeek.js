import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LockOutlineIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button/Button';

const styles = theme => ({
    root: { padding: theme.spacing(4) },
    helpText: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    }
});

class ClosedWeek extends Component {
    render() {
        const {
            props: { classes, onFillTasksFromSchedule, canFill }
        } = this;
        return (
            <Paper className={classes.root}>
                <Typography variant="h1" align="center">
                    <LockOutlineIcon fontSize="large" />
                </Typography>
                <Typography variant="h3" align="center">
                    Неделя ещё не открыта
                </Typography>
                <Typography
                    className={classes.helpText}
                    variant="body1"
                    align="center"
                >
                    Вы можете открыть неделю, заполнив расписание
                </Typography>
                <Typography align="center">
                    {!canFill && 'У вас нет прав для заполнения расписания'}
                    {canFill && (
                        <Button
                            onClick={onFillTasksFromSchedule}
                            color="primary"
                            variant="contained"
                        >
                            Заполнить
                        </Button>
                    )}
                </Typography>
            </Paper>
        );
    }
}

export default withStyles(styles)(ClosedWeek);
