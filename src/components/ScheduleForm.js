import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { reduxForm } from 'redux-form';
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
