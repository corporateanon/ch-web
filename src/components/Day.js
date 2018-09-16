import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Grid from '@material-ui/core/Grid/Grid';
import Lesson from './Lesson';
import Paper from '@material-ui/core/Paper/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { number, bool, func } from 'prop-types';
import { weekAndDayToDate } from '../lib/dateUtils';

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
        onLessonMore: func
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
                onLessonMore
            }
        } = this;
        const date = weekAndDayToDate(week, day);
        const weekDayStr = moment(date).format('dddd');
        const dateStr = moment(date).format('D MMMM');
        const lessonProps = {
            week,
            day,
            isLessonNameEditable,
            isTaskTextEditable,
            onMore: onLessonMore
        };

        const dayClasses = isExpanded ? classes.expandedDay : classes.day;
        return (
            <Paper className={dayClasses} elevation={10}>
                <Grid container>
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
                    <Lesson {...lessonProps} lesson={0} />
                    <Lesson {...lessonProps} lesson={1} />
                    <Lesson {...lessonProps} lesson={2} />
                    <Lesson {...lessonProps} lesson={3} />
                    <Lesson {...lessonProps} lesson={4} />
                    <Lesson {...lessonProps} lesson={5} />
                    <Lesson {...lessonProps} lesson={6} />
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(Day);
