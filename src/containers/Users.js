import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Bar from '../components/Bar';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';
import UsersForm from '../components/UsersForm';

const mapStateToProps = (state, props) => {
    return {
        data: state.SyncReducer
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
            props: { classes }
        } = this;
        return (
            <Fragment>
                <Bar title="Пользователи" />
                <div className={classes.main}>
                    <UsersForm />
                </div>
            </Fragment>
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
