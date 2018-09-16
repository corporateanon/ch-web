import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Bar from '../components/Bar';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';
import ScheduleForm from '../components/ScheduleForm';

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

class Schedule extends Component {
    render() {
        const { props: { classes } } = this;
        return (
            <Fragment>
                <Bar title="Расписание" />
                <div className={classes.main}>
                    <ScheduleForm />
                </div>
            </Fragment>
        );
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(Schedule);
