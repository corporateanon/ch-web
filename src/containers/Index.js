import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Week from '../components/Week';
import Bar from '../components/Bar';
import withStyles from 'material-ui/styles/withStyles';
import { compose } from 'recompose';

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
        marginTop: 100,
        marginLeft: 20,
        marginRight: 20
    }
});

class Page extends Component {
    render() {
        const { props: { classes, data } } = this;
        return (
            <Fragment>
                <Bar />
                <div className={classes.main}>
                    <Week initialValues={data} />
                </div>
            </Fragment>
        );
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(Page);
