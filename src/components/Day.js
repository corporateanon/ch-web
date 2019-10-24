import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { bool, func, number } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { weekAndDayToDate } from '../lib/dateUtils';
import TasksDayTable from './TasksDayTable';

const styles = theme => ({
    day: {
        marginBottom: theme.spacing(4),
        padding: theme.spacing(2)
    },
    expandedDay: {
        padding: theme.spacing(2)
    },
    link: {
        color: theme.palette.primary.main
    }
});

class Day extends Component {
    static propTypes = {
        day: number.isRequired,
        week: number.isRequired,
        isLessonNameEditable: bool.isRequired,
        isTaskTextEditable: bool.isRequired,
        isExpanded: bool,
        onLessonMore: func,
        onDeleteLesson: func,
        lessonsCount: number,
        onAddLesson: func
    };

    handleAddLesson = () => {
        const {
            props: { week, day, onAddLesson }
        } = this;
        onAddLesson(week, day);
    };

    render() {
        const {
            props: {
                classes,
                day,
                week,
                isExpanded,
                onDeleteLesson,
                lessonsCount
            },
            handleAddLesson
        } = this;
        const date = weekAndDayToDate(week, day);
        const weekDayStr = moment(date).add(2, 'h').format('dddd');
        const dateStr = moment(date).add(2, 'h').format('D MMMM');

        const dayClasses = isExpanded ? classes.expandedDay : classes.day;
        return (
            <Paper className={dayClasses} elevation={10}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h5" color="primary">
                            {isExpanded ? (
                                weekDayStr
                            ) : (
                                <Link
                                    to={`/tasks/week/${week}/day/${day}`}
                                    className={classes.link}
                                >
                                    {weekDayStr}
                                </Link>
                            )}
                        </Typography>
                        <Typography variant="caption">{dateStr}</Typography>
                    </Grid>
                    <TasksDayTable
                        day={day}
                        week={week}
                        lessonsCount={lessonsCount}
                        onAddLesson={handleAddLesson}
                        onDeleteLesson={onDeleteLesson}
                    ></TasksDayTable>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(Day);
