import React, { Component } from 'react';
import Grid from 'material-ui/Grid/Grid';
import Lesson from './Lesson';
import Paper from 'material-ui/Paper/Paper';
import { withStyles } from 'material-ui/styles';
import { number, string } from 'prop-types';
import { FieldArray, reduxForm } from 'redux-form';
import { range } from 'lodash';
import { compose } from 'recompose';
import ScheduleDay from './ScheduleDay';

const styles = theme => ({
    // root: {
    //     marginBottom: 32
    // }
});

class ScheduleForm extends Component {
    static propTypes = {};
    render() {
        const { props: { title, classes, day } } = this;
        return range(0, 7).map(d => <ScheduleDay key={d} day={d} />);
    }
}

export default compose(
    reduxForm({
        form: 'schedule',
        enableReinitialize: true,
        destroyOnUnmount: false
    }),
    withStyles(styles)
)(ScheduleForm);
