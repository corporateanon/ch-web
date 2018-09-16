import React from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form';
import RFLabel from './RFLabel';

const styles = theme => ({
    textFieldInput: {
        color: theme.palette.text.primary
    }
});

const TextFieldInput = props => {
    const { classes, input, ...rest } = props;
    return (
        <TextField
            fullWidth
            inputProps={{ className: classes.textFieldInput }}
            {...rest}
            {...props.input}
        />
    );
};

const RFTextField = props => {
    const { name, label, labelName, ...rest } = props;
    const fieldLabel = labelName ? <RFLabel name={labelName} /> : label;
    return (
        <Field
            name={name}
            label={fieldLabel}
            component={TextFieldInput}
            {...rest}
        />
    );
};

export default withStyles(styles)(RFTextField);
