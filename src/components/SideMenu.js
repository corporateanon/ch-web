import React, { Component } from 'react';
import { compose } from 'recompose';
import withStyles from 'material-ui/styles/withStyles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';

const styles = {};

const LinkItem = props => <Link {...props} />;

class SideMenu extends Component {
    render() {
        const { props: { open, onClose } } = this;
        return (
            <Drawer open={open} onClose={onClose}>
                <List component="nav">
                    <ListItem component={LinkItem} button to="/">
                        <ListItemText primary="Домашние задания" />
                    </ListItem>
                    <ListItem component={LinkItem} button to="/schedule">
                        <ListItemText primary="Расписание" />
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

export default compose(withStyles(styles))(SideMenu);
