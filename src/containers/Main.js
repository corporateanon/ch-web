import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from 'material-ui/styles/withStyles';
import { compose } from 'recompose';
import Bar from '../components/Bar';

const mapStateToProps = (state, props) => {
    return {};
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

const styles = {};

class Main extends Component {
    render() {
        const { props: { classes, children } } = this;
        return (
            <Fragment>
                <Bar />
                {children}
            </Fragment>
        );
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Main);
