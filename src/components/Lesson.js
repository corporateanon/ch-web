import React, { Component, Fragment } from 'react';
import Grid from 'material-ui/Grid/Grid';
import Paper from 'material-ui/Paper/Paper';
import { number, bool } from 'prop-types';
import RFTextField from './RFTextField';

class Lesson extends Component {
    static propTypes = {
        lesson: number.isRequired,
        day: number.isRequired,
        week: number.isRequired,
        isTaskTextEditable: bool.isRequired,
        isLessonNameEditable: bool.isRequired
    };
    getLessonNameKey = () => {
        const { props: { day, lesson, week } } = this;
        return `tasks.${week}.${day}.${lesson}.lessonName`;
    };
    getTaskTextKey = () => {
        const { props: { day, lesson, week } } = this;
        return `tasks.${week}.${day}.${lesson}.taskText`;
    };
    render() {
        const { props: { isTaskTextEditable, isLessonNameEditable } } = this;
        const lessonNameKey = this.getLessonNameKey();
        const taskTextKey = this.getTaskTextKey();
        return (
            <Fragment>
                <Grid item xs={3}>
                    <RFTextField
                        disabled={!isLessonNameEditable}
                        name={lessonNameKey}
                    />
                </Grid>
                <Grid item xs={9}>
                    <RFTextField
                        disabled={!isTaskTextEditable}
                        name={taskTextKey}
                    />
                </Grid>
            </Fragment>
        );
    }
}

class ExpandedLesson extends Lesson {
    render() {
        const { props: { isTaskTextEditable, isLessonNameEditable } } = this;
        const lessonNameKey = this.getLessonNameKey();
        const taskTextKey = this.getTaskTextKey();
        return (
            <Grid item xs={12}>
                <RFTextField
                    multiline
                    disabled={!isTaskTextEditable}
                    name={taskTextKey}
                    labelName={lessonNameKey}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </Grid>
        );
    }
}

export { ExpandedLesson };
export default Lesson;
