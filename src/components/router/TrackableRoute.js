import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TrackableRoute extends Component {
    render() {
        const { props: { name, RouteChanged, component: C, ...rest } } = this;

        return (
            <Route
                {...rest}
                render={route => {
                    const { match } = route;
                    setImmediate(_ => RouteChanged(name, match));
                    return <C {...route} />;
                }}
            />
        );
    }
}

const RouteChanged = (name, match) => ({
    type: 'ROUTE_CHANGED',
    payload: { name, match }
});

export default connect(null, dispatch => {
    return bindActionCreators({ RouteChanged }, dispatch);
})(TrackableRoute);
