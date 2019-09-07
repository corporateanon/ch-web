import {
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    withStyles
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { range } from 'lodash';
import withConfirm from 'material-ui-confirm';
import { func, number } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getEditMode } from '../ducks/Week';
import RFLabel from './RFLabel';
import RFTextField from './RFTextField';

const fieldName = (week, day, lesson, property) =>
    `tasks.${week}.${day}.${lesson}.${property}`;

const EditableField = ({ name, isEdit, InputProps }) =>
    isEdit ? (
        <RFTextField name={name} {...InputProps} />
    ) : (
        <RFLabel name={name} />
    );

const TasksDayTable = ({
    week,
    day,
    lessonsCount,
    classes,
    onAddLesson,
    onDeleteLesson,
    editMode,
    confirm
}) => {
    return (
        <>
            {lessonsCount ? (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                className={classes.tdNumber}
                                padding="none"
                            >
                                #
                            </TableCell>
                            <TableCell
                                className={classes.tdName}
                                padding="none"
                            >
                                Предмет
                            </TableCell>
                            <TableCell>Задание</TableCell>
                            <TableCell
                                className={classes.tdLocation}
                                padding="none"
                            >
                                Кабинет
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {range(0, lessonsCount).map(lesson => (
                            <TableRow key={lesson}>
                                <TableCell padding="none">
                                    {lesson + 1}
                                </TableCell>
                                <TableCell padding="none">
                                    <EditableField
                                        isEdit={editMode.full}
                                        name={fieldName(
                                            week,
                                            day,
                                            lesson,
                                            'lessonName'
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <EditableField
                                        isEdit={editMode.tasks || editMode.full}
                                        multiline
                                        InputProps={{ multiline: true }}
                                        name={fieldName(
                                            week,
                                            day,
                                            lesson,
                                            'taskText'
                                        )}
                                    />
                                </TableCell>
                                <TableCell padding="none">
                                    <EditableField
                                        isEdit={editMode.full}
                                        name={fieldName(
                                            week,
                                            day,
                                            lesson,
                                            'lessonLocation'
                                        )}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <Typography variant="h6">Уроков нет</Typography>
            )}
            {editMode.full ? (
                <Grid container>
                    <Grid item>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={onAddLesson}
                        >
                            <AddCircleIcon className={classes.buttonIcon} />
                            Добавить урок
                        </Button>
                    </Grid>
                    <Grid item xs></Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={confirm(
                                () =>
                                    onDeleteLesson(week, day, lessonsCount - 1),
                                {
                                    title: 'Вы уверены?',
                                    description:
                                        'Удаление урока нельзя будет отменить'
                                }
                            )}
                        >
                            <DeleteIcon className={classes.buttonIcon} />
                            Удалить последний урок
                        </Button>
                    </Grid>
                </Grid>
            ) : null}
        </>
    );
};

TasksDayTable.propTypes = {
    day: number.isRequired,
    week: number.isRequired,
    lessonsCount: number.isRequired,
    onAddLesson: func.isRequired
};

const styles = theme => ({
    tdNumber: {
        width: theme.spacing(2)
    },
    tdLocation: {
        width: theme.spacing(2)
    },
    tdName: {
        width: theme.spacing(10)
    },
    tdAction: {
        width: theme.spacing(2)
    },
    buttonIcon: {
        marginRight: theme.spacing(1)
    }
});

export default compose(
    connect(state => ({
        editMode: getEditMode(state)
    })),
    withStyles(styles),
    withConfirm
)(TasksDayTable);
