import React, { Component, Fragment } from 'react';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid/Grid';
import Paper from 'material-ui/Paper/Paper';
import { number, bool } from 'prop-types';
import RFTextField from './RFTextField';
import ListIcon from 'material-ui-icons/List';
import { withStyles } from 'material-ui/styles';

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

const ExpandedLesson = withStyles(theme => ({
    hbox: { display: 'flex' },
    icon: {
        alignSelf: 'flex-end',
        marginLeft: theme.spacing.unit
    },
    textarea: {
        flex: 1
    }
}))(
    class extends Lesson {
        render() {
            const { props: { isTaskTextEditable, classes } } = this;
            const lessonNameKey = this.getLessonNameKey();
            const taskTextKey = this.getTaskTextKey();
            return (
                <Grid item xs={12}>
                    <div className={classes.hbox}>
                        <RFTextField
                            multiline
                            className={classes.textarea}
                            disabled={!isTaskTextEditable}
                            name={taskTextKey}
                            labelName={lessonNameKey}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <IconButton className={classes.icon}>
                            <ListIcon />
                        </IconButton>
                    </div>
                </Grid>
            );
        }
    }
);

export { ExpandedLesson };
export default Lesson;
