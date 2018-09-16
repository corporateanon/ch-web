import React, { Component, Fragment } from 'react';
import Bar from '../components/Bar';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { selectLogItems } from '../ducks/Log';
import LogView from '../components/LogView';

const mapStateToProps = state => ({
    logItems: selectLogItems(state)
});

const styles = theme => ({
    main: {
        marginTop: 70,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 600
    }
});

class Log extends Component {
    render() {
        const {
            props: { classes, logItems }
        } = this;
        return (
            <Fragment>
                <Bar title="Лог" />
                <div className={classes.main}>
                    <LogView items={logItems} />
                </div>
            </Fragment>
        );
    }
}

export default compose(connect(mapStateToProps), withStyles(styles))(Log);
