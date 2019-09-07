import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { bindActionCreators } from 'redux';

const Trackable = ({ C, name, route, RouteChanged }) => {
    const { match } = route;
    useEffect(() => {
        RouteChanged(name, match);
    });
    return <C {...route} />;
};

const TrackableRoute = ({ name, RouteChanged, component: C, ...rest }) => {
    return (
        <Route
            {...rest}
            render={route => (
                <Trackable
                    RouteChanged={RouteChanged}
                    C={C}
                    name={name}
                    route={route}
                />
            )}
        />
    );
};

const RouteChanged = (name, match) => ({
    type: 'ROUTE_CHANGED',
    payload: { name, match }
});

export default connect(
    null,
    dispatch => {
        return bindActionCreators({ RouteChanged }, dispatch);
    }
)(TrackableRoute);
