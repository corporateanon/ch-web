import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Component } from 'react';
import { compose } from 'recompose';
// import LoginWidget from './LoginWidget';
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

    async componentDidMount() {
        const { default: LoginWidget } = await import('./LoginWidget');
        this.setState({ LoginWidget });
    }

    render() {
        const {
            props: { classes, title },
            state: { sideMenuOpen, LoginWidget },
            handleButtonClick,
            handleDrawerClose
        } = this;
        return (
            <AppBar color="primary" position="static">
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
                    {LoginWidget ? <LoginWidget isLink /> : null}
                </Toolbar>
                <SideMenu open={sideMenuOpen} onClose={handleDrawerClose} />
            </AppBar>
        );
    }
}

export default compose(withStyles(styles))(Bar);
