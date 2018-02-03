import React, { Component, Fragment } from 'react';
import TextField from 'material-ui/TextField/TextField';
import Grid from 'material-ui/Grid/Grid';
import { number } from 'prop-types';
import { Field, FormSection } from 'redux-form';

const RFTextField = field => <TextField fullWidth {...field.input} />;

export default class Lesson extends Component {
    static propTypes = {
        lesson: number.isRequired,
        day: number.isRequired
    };
    render() {
        const { props: { day, lesson } } = this;
        const prefix = `days[${day}].lessons[${lesson}]`;
        const lessonNameKey = `${prefix}.lessonName`;
        const taskTextKey = `${prefix}.taskText`;
        return (
            <Fragment>
                <Grid item xs={3}>
                    <Field name={lessonNameKey} component={RFTextField} />
                </Grid>
                <Grid item xs={9}>
                    <Field name={taskTextKey} component={RFTextField} />
                </Grid>
            </Fragment>
        );
    }
}
