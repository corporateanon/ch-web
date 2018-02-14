import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from 'material-ui/styles/withStyles';
import { compose } from 'recompose';
import LoginWidget from '../components/LoginWidget';

const mapStateToProps = (state, props) => {
    return {};
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

const styles = {};

class Auth extends Component {
    render() {
        return <LoginWidget />;
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Auth);
