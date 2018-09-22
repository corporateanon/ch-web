import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid/Grid';
import { number, bool, func } from 'prop-types';
import RFTextField from './RFTextField';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MenuButton from './MenuButton';
import { Button, ListItemIcon, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import HistoryIcon from '@material-ui/icons/History';
import EditIcon from '@material-ui/icons/Edit';

const labelFormat = lesson => value => `${(lesson | 0) + 1}. ${value || ''}`;

const Lesson = withStyles(theme => ({
    hbox: { display: 'flex', marginTop: theme.spacing.unit * 4 },
    icon: {
        alignSelf: 'flex-end',
        marginLeft: theme.spacing.unit
    },
    textarea: {
        flex: 1
    },
    lessonName: {
        fontSize: theme.spacing.unit * 3,
        fontWeight: 500
    }
}))(
    class extends Component {
        static propTypes = {
            lesson: number.isRequired,
            day: number.isRequired,
            week: number.isRequired,
            isTaskTextEditable: bool.isRequired,
            isLessonNameEditable: bool.isRequired,
            onMore: func,
            onDeleteLesson: func
        };
        state = {
            editingLesson: false
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
        handleHistoryClick = () => {
            const {
                props: { onMore, week, day, lesson }
            } = this;
            onMore && onMore({ week, day, lesson });
        };
        handleLessonEditClick = () => {
            this.setState({ editingLesson: true });
        };
        handleLessonDeleteClick = () => {
            const {
                props: { onDeleteLesson, week, day, lesson }
            } = this;
            onDeleteLesson && onDeleteLesson(week, day, lesson);
        };
        handleEditDialogClose = () => {
            this.setState({ editingLesson: false });
        };
        render() {
            const {
                props: {
                    isTaskTextEditable,
                    isLessonNameEditable,
                    classes,
                    lesson
                },
                state: { editingLesson },
                handleHistoryClick,
                handleLessonEditClick,
                handleEditDialogClose,
                handleLessonDeleteClick
            } = this;
            const lessonNameKey = this.getLessonNameKey();
            const taskTextKey = this.getTaskTextKey();
            return (
                <Grid item xs={12}>
                    <div className={classes.hbox}>
                        <Dialog
                            open={editingLesson}
                            onClose={handleEditDialogClose}
                        >
                            <DialogContent>
                                <RFTextField name={lessonNameKey} />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={handleEditDialogClose}
                                    color="primary"
                                >
                                    Закрыть
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <RFTextField
                            multiline
                            className={classes.textarea}
                            disabled={!isTaskTextEditable}
                            name={taskTextKey}
                            labelName={lessonNameKey}
                            labelFormat={labelFormat(lesson)}
                            InputLabelProps={{
                                shrink: true,
                                className: classes.lessonName
                            }}
                        />
                        <MenuButton
                            button={onClick => (
                                <IconButton
                                    className={classes.icon}
                                    onClick={onClick}
                                >
                                    <MoreIcon />
                                </IconButton>
                            )}
                        >
                            {withClose => [
                                <MenuItem
                                    key={0}
                                    onClick={withClose(handleHistoryClick)}
                                >
                                    <ListItemIcon>
                                        <HistoryIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        История изменений
                                    </ListItemText>
                                </MenuItem>,
                                isLessonNameEditable ? (
                                    <MenuItem
                                        key={1}
                                        onClick={withClose(
                                            handleLessonEditClick
                                        )}
                                    >
                                        <ListItemIcon>
                                            <EditIcon />
                                        </ListItemIcon>
                                        <ListItemText>
                                            Изменить название урока
                                        </ListItemText>
                                    </MenuItem>
                                ) : null,
                                isLessonNameEditable ? (
                                    <MenuItem
                                        key={2}
                                        onClick={withClose(
                                            handleLessonDeleteClick
                                        )}
                                    >
                                        <ListItemIcon>
                                            <DeleteIcon />
                                        </ListItemIcon>
                                        <ListItemText>
                                            Удалить урок
                                        </ListItemText>
                                    </MenuItem>
                                ) : null
                            ]}
                        </MenuButton>
                    </div>
                </Grid>
            );
        }
    }
);

export default Lesson;
