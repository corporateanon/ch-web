import { withStyles } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import {
    canManageSchedule,
    canManageTasks,
    canManageTasksLessons
} from '../ducks/Auth';
import { FillScheduleFromTasks } from '../ducks/Schedule';
import { getEditMode, SetEditMode } from '../ducks/Week';

const AppSpeedDial = ({
    SetEditMode,
    editMode,
    FillScheduleFromTasks,
    classes,
    canManageTasks,
    canManageTasksLessons,
    canManageSchedule
}) => {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        if (isEditing()) {
            SetEditMode({});
        } else {
            setOpen(prevOpen => !prevOpen);
        }
    };

    const handleOpen = () => {
        if (isEditing()) {
            return;
        }
        setOpen(true);
    };

    const handleClose = () => {
        if (isEditing()) {
            return;
        }
        setOpen(false);
    };

    const handleEditTasks = () => {
        SetEditMode({
            tasks: true
        });
    };
    const handleEditFull = () => {
        SetEditMode({
            full: true
        });
    };
    const handleFillScheduleFromTasks = () => {
        FillScheduleFromTasks();
    };

    const isEditing = () => Object.values(editMode).some(flag => flag === true);

    const isMenuEnabled = () => !isEditing();

    const menuItems = [
        {
            name: 'Заполнить расписание из текущей недели',
            icon: <EditIcon />,
            click: handleFillScheduleFromTasks,
            visible: canManageSchedule
        },
        {
            name: 'Редактировать задания',
            icon: <EditIcon />,
            click: handleEditTasks,
            visible: canManageTasks
        },
        {
            name: 'Редактировать всё',
            icon: <EditOutlinedIcon />,
            click: handleEditFull,
            visible: canManageTasksLessons
        }
    ].filter(item => item.visible);

    if (menuItems.length === 0) {
        return null;
    }

    return (
        <SpeedDial
            ButtonProps={{ color: isEditing() ? 'secondary' : 'primary' }}
            ariaLabel=""
            icon={
                <SpeedDialIcon
                    openIcon={isEditing() ? <DoneIcon /> : <EditIcon />}
                />
            }
            className={classes.main}
            onBlur={handleClose}
            onClick={handleClick}
            onClose={handleClose}
            onFocus={handleOpen}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            open={open}
        >
            {isMenuEnabled()
                ? menuItems.map((item, i) => (
                      <SpeedDialAction
                          key={i}
                          icon={item.icon}
                          tooltipTitle={item.name}
                          onClick={item.click}
                          tooltipOpen
                      />
                  ))
                : []}
        </SpeedDial>
    );
};

const styles = theme => ({
    main: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
});

export default compose(
    connect(
        state => ({
            editMode: getEditMode(state),
            canManageTasksLessons: canManageTasksLessons(state),
            canManageTasks: canManageTasks(state),
            canManageSchedule: canManageSchedule(state)
        }),
        dispatch =>
            bindActionCreators(
                {
                    SetEditMode,
                    FillScheduleFromTasks
                },
                dispatch
            )
    ),
    withStyles(styles)
)(AppSpeedDial);
