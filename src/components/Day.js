import React, { Component } from 'react';
import { range } from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Grid from '@material-ui/core/Grid/Grid';
import Lesson from './Lesson';
import Paper from '@material-ui/core/Paper/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { number, bool, func } from 'prop-types';
import { weekAndDayToDate } from '../lib/dateUtils';
import Button from '@material-ui/core/Button';
import TasksDayTable from './TasksDayTable';

const styles = theme => ({
    day: {
        marginBottom: theme.spacing.unit * 4,
        padding: theme.spacing.unit * 2
    },
    expandedDay: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 600,
        padding: theme.spacing.unit * 2
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
        const lessonProps = {
            week,
            day,
            isLessonNameEditable,
            isTaskTextEditable,
            onMore: onLessonMore,
            onDeleteLesson
        };

        const dayClasses = isExpanded ? classes.expandedDay : classes.day;
        return (
            <Paper className={dayClasses} elevation={10}>
                <TasksDayTable
                    day={day}
                    week={week}
                    lessonsCount={lessonsCount}
                ></TasksDayTable>
                {/* <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="title">
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
                    {range(0, lessonsCount).map(lesson => (
                        <Lesson {...lessonProps} key={lesson} lesson={lesson} />
                    ))}
                    {isLessonNameEditable && (
                        <Grid item xs={12}>
                            <Grid container justify="flex-end">
                                <Button onClick={handleAddLesson}>
                                    Добавить урок
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </Grid> */}
            </Paper>
        );
    }
}

export default withStyles(styles)(Day);
