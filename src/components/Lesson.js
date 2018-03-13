import React, { Component, Fragment } from 'react';
import Grid from 'material-ui/Grid/Grid';
import { number, bool } from 'prop-types';
import { Field } from 'redux-form';
import RFTextField from './RFTextField';

class Lesson extends Component {
    static propTypes = {
        lesson: number.isRequired,
        day: number.isRequired,
        week: number.isRequired,
        isTaskTextEditable: bool.isRequired,
        isLessonNameEditable: bool.isRequired
    };
    render() {
        const {
            props: {
                day,
                lesson,
                week,
                isTaskTextEditable,
                isLessonNameEditable
            }
        } = this;
        const prefix = `tasks.${week}.${day}.${lesson}`;
        const lessonNameKey = `${prefix}.lessonName`;
        const taskTextKey = `${prefix}.taskText`;
        return (
            <Fragment>
                <Grid item xs={3}>
                    <Field
                        disabled={!isLessonNameEditable}
                        week={week}
                        name={lessonNameKey}
                        component={RFTextField}
                    />
                </Grid>
                <Grid item xs={9}>
                    <Field
                        disabled={!isTaskTextEditable}
                        week={week}
                        name={taskTextKey}
                        component={RFTextField}
                    />
                </Grid>
            </Fragment>
        );
    }
}

export default Lesson;
