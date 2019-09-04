import { withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import React from 'react';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

const AppSpeedDial = ({ classes, history }) => {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = () => {
        history.push('?edit=1');
    };

    return (
        <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            className={classes.main}
            onBlur={handleClose}
            onClick={handleClick}
            onClose={handleClose}
            onFocus={handleOpen}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            open={open}
        >
            <SpeedDialAction
                key={'edit'}
                icon={<EditIcon />}
                tooltipTitle={'Редактировать задания'}
                tooltipOpen
                onClick={handleEdit}
            />
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
    withRouter,
    withStyles(styles)
)(AppSpeedDial);
