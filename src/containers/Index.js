import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Week from '../components/Week';
import withStyles from 'material-ui/styles/withStyles';
import { compose } from 'recompose';

const mapStateToProps = (state, props) => {
    return {};
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

const styles = theme => ({
    paper: {
        marginTop: 100,
        marginLeft: 20,
        marginRight: 20
    }
});

class Page extends Component {
    render() {
        const { props: { classes } } = this;
        return (
            <div className={classes.paper}>
                <Week />
            </div>
        );
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(Page);
