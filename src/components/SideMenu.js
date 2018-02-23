import React, { Component } from 'react';
// import AppBar from 'material-ui/AppBar';
// import Toolbar from 'material-ui/Toolbar';
// import Typography from 'material-ui/Typography';
// import IconButton from 'material-ui/IconButton';
// import MenuIcon from 'material-ui-icons/Menu';
// import LoginWidget from './LoginWidget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import withStyles from 'material-ui/styles/withStyles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
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
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button onClick={() => push('/schedule')}>
                        <ListItemText primary="Manage Schedule" />
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
