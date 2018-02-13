import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import LoginWidget from './LoginWidget';

export default class Bar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography type="title" color="inherit">
                        Title
                    </Typography>
                    <LoginWidget />
                </Toolbar>
            </AppBar>
        );
    }
}
