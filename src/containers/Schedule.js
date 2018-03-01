import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Bar from '../components/Bar';
import withStyles from 'material-ui/styles/withStyles';
import { compose } from 'recompose';
import ScheduleForm from '../components/ScheduleForm';
import { SetTitle } from '../ducks/Navigation';

const mapStateToProps = (state, props) => {
    return {
        data: state.SyncReducer
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ SetTitle }, dispatch);
};

const styles = theme => ({
    main: {
        marginTop: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 600
    }
});

class Schedule extends Component {
    componentDidMount() {
        this.props.SetTitle('Расписание');
    }

    render() {
        const { props: { classes } } = this;
        return (
            <Fragment>
                <Bar />
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
