import React, { Component } from 'react';
import Grid from 'material-ui/Grid/Grid';
import Lesson from './Lesson';
import Paper from 'material-ui/Paper/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { number, string } from 'prop-types';
import { weekAndDayToDate } from '../lib/dateUtils';
import moment from 'moment';

const styles = theme => ({
    root: {
        marginBottom: theme.spacing.unit * 4,
        padding: theme.spacing.unit * 2
    }
});

class Day extends Component {
    static propTypes = {
        day: number.isRequired,
        week: number.isRequired
    };
    render() {
        const { props: { classes, day, week } } = this;
        const date = weekAndDayToDate(week, day);
        const dateStr = moment(date).format('dddd, D MMMM');
        return (
            <Paper className={classes.root} elevation={10}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="title">
                            {dateStr}
                        </Typography>
                    </Grid>
                    <Lesson day={day} lesson={0} />
                    <Lesson day={day} lesson={1} />
                    <Lesson day={day} lesson={2} />
                    <Lesson day={day} lesson={3} />
                    <Lesson day={day} lesson={4} />
                    <Lesson day={day} lesson={5} />
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(Day);
