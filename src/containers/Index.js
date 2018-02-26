import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Week from '../components/Week';
import Bar from '../components/Bar';
import withStyles from 'material-ui/styles/withStyles';
import { compose } from 'recompose';
import { SetPresentWeek, SetNextWeek, SetWeek, getWeek } from '../ducks/Week';
import { currentWeekId as getCurrentWeek } from '../lib/dateUtils';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar/AppBar';
import Typography from 'material-ui/Typography/Typography';
import { SetTitle } from '../ducks/Navigation';

const mapStateToProps = (state, props) => {
    return {
        currentWeekId: getWeek(state)
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            SetPresentWeek,
            SetNextWeek,
            SetWeek,
            SetTitle
        },
        dispatch
    );
};

const styles = theme => ({
    main: {
        marginTop: 100,
        marginLeft: 20,
        marginRight: 20
    },
    tabContainer: {
        marginTop: 3 * theme.spacing.unit
    }
});

class Index extends Component {
    componentDidMount() {
        this.props.SetPresentWeek();
        this.props.SetTitle('Домашние задания');
    }
    handleWeekChange = (e, weekId) => {
        this.props.SetWeek(weekId);
    };
    render() {
        const {
            props: { classes, currentWeekId = getCurrentWeek() },
            handleWeekChange
        } = this;
        return (
            <Fragment>
                <Bar />
                <div className={classes.main}>
                    <AppBar position="static">
                        <Tabs value={currentWeekId} onChange={handleWeekChange}>
                            <Tab value={getCurrentWeek()} label="Эта неделя" />
                            <Tab
                                value={getCurrentWeek() + 1}
                                label="Следующая неделя"
                            />
                        </Tabs>
                    </AppBar>
                    <Typography
                        component="div"
                        className={classes.tabContainer}
                    >
                        <Week week={currentWeekId} />
                    </Typography>
                </div>
            </Fragment>
        );
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(Index);
