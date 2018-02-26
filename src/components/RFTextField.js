import React from 'react';
import TextField from 'material-ui/TextField/TextField';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    textFieldInput: {
        color: theme.palette.text.primary
    }
});

const RFTextField = props => {
    const { disabled, classes } = props;
    return (
        <TextField
            fullWidth
            inputProps={{ className: classes.textFieldInput }}
            {...{ disabled }}
            {...props.input}
        />
    );
};

export default withStyles(styles)(RFTextField);
