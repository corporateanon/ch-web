import React, { Component, Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid/Grid';
import { number, bool, func } from 'prop-types';
import RFTextField from './RFTextField';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';

const Lesson = withStyles(theme => ({
    hbox: { display: 'flex', marginTop: theme.spacing.unit * 4 },
    icon: {
        alignSelf: 'flex-end',
        marginLeft: theme.spacing.unit
    },
    textarea: {
        flex: 1
    }
}))(
    class extends Component     {
        static propTypes = {
            lesson: number.isRequired,
            day: number.isRequired,
            week: number.isRequired,
            isTaskTextEditable: bool.isRequired,
            isLessonNameEditable: bool.isRequired,
            onMore: func
        };
        getLessonNameKey = () => {
            const {
                props: { day, lesson, week }
            } = this;
            return `tasks.${week}.${day}.${lesson}.lessonName`;
        };
        getTaskTextKey = () => {
            const {
                props: { day, lesson, week }
            } = this;
            return `tasks.${week}.${day}.${lesson}.taskText`;
        };
        handleMoreClick = () => {
            const {
                props: { onMore, week, day, lesson }
            } = this;
            onMore && onMore({ week, day, lesson });
        };
        render() {
            const {
                props: { isTaskTextEditable, classes },
                handleMoreClick
            } = this;
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
                        <IconButton
                            className={classes.icon}
                            onClick={handleMoreClick}
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Grid>
            );
        }
    }
);

export default Lesson;
