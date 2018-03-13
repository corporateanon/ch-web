import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Grid from 'material-ui/Grid/Grid';
import Lesson from './Lesson';
import Paper from 'material-ui/Paper/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { number, bool } from 'prop-types';
import { weekAndDayToDate } from '../lib/dateUtils';

const styles = theme => ({
    root: {
        marginBottom: theme.spacing.unit * 4,
        padding: theme.spacing.unit * 2
    }
});

class Day extends Component {
    static propTypes = {
        day: number.isRequired,
        week: number.isRequired,
        isLessonNameEditable: bool.isRequired,
        isTaskTextEditable: bool.isRequired
    };
    render() {
        const {
            props: {
                classes,
                day,
                week,
                isLessonNameEditable,
                isTaskTextEditable
            }
        } = this;
        const date = weekAndDayToDate(week, day);
        const weekDayStr = moment(date).format('dddd');
        const dateStr = moment(date).format('D MMMM');
        const lessonProps = {
            week,
            day,
            isLessonNameEditable,
            isTaskTextEditable
        };
        return (
            <Paper className={classes.root} elevation={10}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="title">
                            <Link to={`/tasks/week/${week}/day/${day}`}>
                                {weekDayStr}
                            </Link>
                        </Typography>
                        <Typography variant="caption">{dateStr}</Typography>
                    </Grid>
                    <Lesson {...lessonProps} lesson={0} />
                    <Lesson {...lessonProps} lesson={1} />
                    <Lesson {...lessonProps} lesson={2} />
                    <Lesson {...lessonProps} lesson={3} />
                    <Lesson {...lessonProps} lesson={4} />
                    <Lesson {...lessonProps} lesson={5} />
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(Day);
