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
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import RFLabel from './RFLabel';
import RFTextField from './RFTextField';

const fieldName = (week, day, lesson, property) =>
    `tasks.${week}.${day}.${lesson}.${property}`;

const isEditMode = location => (location.search || '').match('edit=1');

const TasksDayTable = ({ week, day, lessonsCount, classes, location }) => {
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
                            <RFLabel
                                name={fieldName(
                                    week,
                                    day,
                                    lesson,
                                    'lessonName'
                                )}
                            />
                        </TableCell>
                        <TableCell>
                            {isEditMode(location) ? (
                                <RFTextField
                                    name={fieldName(
                                        week,
                                        day,
                                        lesson,
                                        'taskText'
                                    )}
                                />
                            ) : (
                                <RFLabel
                                    name={fieldName(
                                        week,
                                        day,
                                        lesson,
                                        'taskText'
                                    )}
                                />
                            )}
                        </TableCell>
                        <TableCell padding="none">
                            <RFLabel
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
        width: theme.spacing.unit * 2
    },
    tdLocation: {
        width: theme.spacing.unit * 2
    },
    tdName: {
        width: theme.spacing.unit * 10
    }
});

export default compose(
    withRouter,
    withStyles(styles)
)(TasksDayTable);
