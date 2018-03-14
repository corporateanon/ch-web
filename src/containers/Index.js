import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import withStyles from 'material-ui/styles/withStyles';

import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar/AppBar';
import Typography from 'material-ui/Typography/Typography';

import { currentWeekId as getCurrentWeek } from '../lib/dateUtils';
import { getWeek, isClosedWeek } from '../ducks/Week';
import { canManageTasks, canManageTasksLessons } from '../ducks/Auth';
import { isFormSyncing } from '../ducks/Sync';
import { FillSchedule } from '../ducks/Schedule';

import Week from '../components/Week';
import Day from '../components/Day';
import Bar from '../components/Bar';

const mapStateToProps = (state, props) => {
    return {
        currentWeekId: getWeek(state),
        canManageTasks: canManageTasks(state),
        canManageTasksLessons: canManageTasksLessons(state),
        isClosedWeek: isClosedWeek(state),
        isSyncing: isFormSyncing('currentWeek')(state)
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ FillSchedule }, dispatch);
};

const styles = theme => ({
    main: {
        marginTop: 70,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    tabContainer: {
        marginTop: 3 * theme.spacing.unit
    }
});

class Index extends Component {
    handleTab = (e, url) => {
        this.props.history.push(url);
    };
    render() {
        const {
            props: {
                classes,
                canManageTasks,
                canManageTasksLessons,
                currentWeekId = getCurrentWeek(),
                isClosedWeek,
                isSyncing,
                match: { url, params: { day } },
                FillSchedule
            },
            handleTab
        } = this;

        const onlyDay = day ? parseInt(day, 10) : null;
        const isDay = !!day;

        return (
            <Fragment>
                <Bar title="Домашние задания" />
                <div className={classes.main}>
                    <AppBar position="static" color="default">
                        <Tabs value={url} onChange={handleTab}>
                            <Tab value="/" label="Эта неделя" />
                            <Tab value="/next" label="Следующая неделя" />
                        </Tabs>
                    </AppBar>
                    <Typography
                        component="div"
                        className={classes.tabContainer}
                    >
                        <Week
                            week={currentWeekId}
                            day={onlyDay}
                            showSingleDay={isDay}
                            isClosedWeek={isClosedWeek}
                            isSyncing={isSyncing}
                            isTaskTextEditable={canManageTasks}
                            isLessonNameEditable={canManageTasksLessons}
                            onFillSchedule={FillSchedule}
                        />
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
