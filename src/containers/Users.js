import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Bar from '../components/Bar';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';
import UsersForm from '../components/UsersForm';
import { canManageUsers, getUid } from '../ducks/Auth';
import Page403 from './Page403';

const mapStateToProps = (state, props) => {
    return {
        canManageUsers: canManageUsers(state),
        myUid: getUid(state)
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

const styles = theme => ({
    main: {
        marginTop: 70,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 600
    }
});

class Users extends Component {
    render() {
        const {
            props: { classes, canManageUsers, myUid }
        } = this;
        return canManageUsers ? (
            <Fragment>
                <Bar title="Пользователи" />
                <div className={classes.main}>
                    <UsersForm myUid={myUid} />
                </div>
            </Fragment>
        ) : (
            <Page403 />
        );
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withStyles(styles)
)(Users);
