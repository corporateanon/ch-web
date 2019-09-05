import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    withStyles
} from '@material-ui/core';
import { range } from 'lodash';
import { number } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import RFLabel from './RFLabel';
import RFTextField from './RFTextField';
import { getEditMode } from '../ducks/Week';

const fieldName = (week, day, lesson, property) =>
    `tasks.${week}.${day}.${lesson}.${property}`;

const EditableField = ({ name, isEdit }) =>
    isEdit ? <RFTextField name={name} /> : <RFLabel name={name} />;

const TasksDayTable = ({
    week,
    day,
    lessonsCount,
    classes,
    location,
    editMode
}) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.tdNumber} padding="none">
                        #
                    </TableCell>
                    <TableCell className={classes.tdName} padding="none">
                        Предмет
                    </TableCell>
                    <TableCell>Задание</TableCell>
                    <TableCell className={classes.tdLocation} padding="none">
                        Кабинет
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {range(0, lessonsCount).map(lesson => (
                    <TableRow key={lesson}>
                        <TableCell padding="none">{lesson + 1}</TableCell>
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
                                name={fieldName(week, day, lesson, 'taskText')}
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
    );
};

TasksDayTable.propTypes = {
    day: number.isRequired,
    week: number.isRequired,
    lessonsCount: number.isRequired
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
    }
});

export default compose(
    connect(state => ({
        editMode: getEditMode(state)
    })),
    withStyles(styles)
)(TasksDayTable);
