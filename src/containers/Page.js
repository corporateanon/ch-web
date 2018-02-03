import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Week from '../components/Week';

const mapStateToProps = (state, props) => {
    return {};
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

class Page extends Component {
    render() {
        return <Week />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
