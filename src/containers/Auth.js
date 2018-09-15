import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';
import LoginWidget from '../components/LoginWidget';
import { SetTitle } from '../ducks/Navigation';

const mapStateToProps = (state, props) => {
    return {};
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ SetTitle }, dispatch);
};

const styles = {};

class Auth extends Component {
    componentDidMount() {
        this.props.SetTitle('Авторизация');
    }
    render() {
        return <LoginWidget />;
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Auth);
