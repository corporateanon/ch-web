import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import LoginWidget from './LoginWidget';
import { compose } from 'recompose';
import withStyles from 'material-ui/styles/withStyles';

const styles = {
    flex: {
        flex: 1
    }
};

class Bar extends Component {
    render() {
        const { props: { classes } } = this;
        return (
            <AppBar>
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        type="title"
                        color="inherit"
                        className={classes.flex}
                    >
                        Title
                    </Typography>
                    <LoginWidget isLink />
                </Toolbar>
            </AppBar>
        );
    }
}

export default compose(withStyles(styles))(Bar);
