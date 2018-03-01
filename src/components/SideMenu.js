import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import withStyles from 'material-ui/styles/withStyles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withRouter } from 'react-router-dom';
const mapStateToProps = (state, props) => {
    return {};
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

const styles = {};

class SideMenu extends Component {
    push = url => {
        const { props: { history } } = this;
        history.push(url);
    };

    render() {
        const { props: { open, onClose }, push } = this;
        return (
            <Drawer open={open} onClose={onClose}>
                <List component="nav">
                    <ListItem button onClick={() => push('/')}>
                        <ListItemText primary="Домашние задания" />
                    </ListItem>
                    <ListItem button onClick={() => push('/schedule')}>
                        <ListItemText primary="Расписание" />
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(SideMenu);
