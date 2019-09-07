import React from 'react';
import { Field } from 'redux-form';
import { makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles(theme =>
    createStyles({
        label: {
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
        }
    })
);

const Label = props => {
    const classes = useStyles();
    return <div className={classes.label}>{props.input.value || '\u00A0'}</div>;
};

const RFLabel = props => {
    const { name } = props;
    return <Field name={name} component={Label} {...props} />;
};

export default RFLabel;
