import React, { Component } from 'react';
import { compose } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { canManageSchedule, canViewLog, canManageUsers } from '../ducks/Auth';

const styles = {};
const mapStateToProps = state => ({
    canManageSchedule: canManageSchedule(state),
    canViewLog: canViewLog(state),
    canManageUsers: canManageUsers(state)
});

const LinkItem = props => <Link {...props} />;

class SideMenu extends Component {
    render() {
        const {
            props: { open, onClose, canManageSchedule, canViewLog }
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
                    {canManageUsers && (
                        <ListItem component={LinkItem} button to="/users">
                            <ListItemText primary="Пользователи" />
                        </ListItem>
                    )}
                    {canViewLog && (
                        <ListItem component={LinkItem} button to="/log">
                            <ListItemText primary="Лог" />
                        </ListItem>
                    )}
                </List>
            </Drawer>
        );
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps)
)(SideMenu);
