import React, { Component } from 'react';
import Grid from 'material-ui/Grid/Grid';
import Day from './Day';
import { reduxForm } from 'redux-form';

class Week extends Component {
    render() {
        return (
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Day day={0} title="Понедельник" />
                    <Day day={1} title="Вторник" />
                    <Day day={2} title="Среда" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Day day={3} title="Четверг" />
                    <Day day={4} title="Пятница" />
                </Grid>
            </Grid>
        );
    }
}

export default reduxForm({
    form: 'currentWeek'
})(Week);
