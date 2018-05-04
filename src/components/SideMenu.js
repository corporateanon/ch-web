import React, { Component } from 'react';
import { compose } from 'recompose';
import withStyles from 'material-ui/styles/withStyles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { canManageSchedule } from '../ducks/Auth';

const styles = {};
const mapStateToProps = state => ({
    canManageSchedule: canManageSchedule(state)
});

const LinkItem = props => <Link {...props} />;

class SideMenu extends Component {
    render() {
        const {
            props: { open, onClose, canManageSchedule }
        } = this;
        return (
            <Drawer open={open} onClose={onClose}>
                <List component="nav">
                    <ListItem component={LinkItem} button to="/">
                        <ListItemText primary="Домашние задания" />
                    </ListItem>
                    {canManageSchedule && (
                        <ListItem component={LinkItem} button to="/schedule">
                            <ListItemText primary="Расписание" />
                        </ListItem>
                    )}
                    <ListItem component={LinkItem} button to="/log">
                        <ListItemText primary="Лог" />
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(SideMenu);
