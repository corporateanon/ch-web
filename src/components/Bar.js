import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginWidget from './LoginWidget';
import { compose } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import SideMenu from './SideMenu';

const styles = {
    title: {
        flex: 1
    }
};

class Bar extends Component {
    state = {
        sideMenuOpen: false
    };

    handleButtonClick = () => {
        this.setState({ sideMenuOpen: true });
    };
    handleDrawerClose = () => {
        this.setState({ sideMenuOpen: false });
    };

    render() {
        const {
            props: { classes, title },
            state: { sideMenuOpen },
            handleButtonClick,
            handleDrawerClose
        } = this;
        return (
            <AppBar color="primary">
                <Toolbar color="primary">
                    <IconButton
                        color="inherit"
                        aria-label="Menu"
                        onClick={handleButtonClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.title}
                    >
                        {title}
                    </Typography>
                    <LoginWidget isLink />
                </Toolbar>
                <SideMenu open={sideMenuOpen} onClose={handleDrawerClose} />
            </AppBar>
        );
    }
}

export default compose(withStyles(styles))(Bar);
