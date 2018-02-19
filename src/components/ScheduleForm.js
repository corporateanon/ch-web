import React, { Component } from 'react';
import Grid from 'material-ui/Grid/Grid';
import Lesson from './Lesson';
import Paper from 'material-ui/Paper/Paper';
import { withStyles } from 'material-ui/styles';
import { number, string } from 'prop-types';
import { FieldArray, reduxForm } from 'redux-form';
import { range } from 'lodash';
import { compose } from 'recompose';

const styles = theme => ({
    // root: {
    //     marginBottom: 32
    // }
});

const Day = ({ day }) => <Paper>day {day}</Paper>;


class ScheduleForm extends Component {
    static propTypes = {};
    render() {
        const { props: { title, classes, day } } = this;
        return (
            <Paper elevation={10}>
                {range(0, 7).map(d => <Day key={d} day={d} />)}
            </Paper>
        );
    }
}

export default compose(
    reduxForm({
        form: 'schedule',
        enableReinitialize: true
    }),
    withStyles(styles)
)(ScheduleForm);
