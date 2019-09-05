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
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 600,
        padding: theme.spacing(2)
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
                isLessonNameEditable,
                isTaskTextEditable,
                isExpanded,
                onLessonMore,
                onDeleteLesson,
                lessonsCount
            },
            handleAddLesson
        } = this;
        const date = weekAndDayToDate(week, day);
        const weekDayStr = moment(date).format('dddd');
        const dateStr = moment(date).format('D MMMM');

        const dayClasses = isExpanded ? classes.expandedDay : classes.day;
        return (
            <Paper className={dayClasses} elevation={10}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            {isExpanded ? (
                                weekDayStr
                            ) : (
                                <Link to={`/tasks/week/${week}/day/${day}`}>
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
