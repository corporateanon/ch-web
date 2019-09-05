import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AppBar from '@material-ui/core/AppBar/AppBar';
import Typography from '@material-ui/core/Typography/Typography';

import { currentWeekId as getCurrentWeek } from '../lib/dateUtils';
import {
    getWeek,
    isClosedWeek,
    getWeekLessonsPerDay,
    AddLesson,
    DeleteLesson
} from '../ducks/Week';
import { canManageTasks, canManageTasksLessons } from '../ducks/Auth';
import { isFormSyncing } from '../ducks/Sync';
import { FillSchedule } from '../ducks/Schedule';
import { OpenDialog } from '../ducks/History';

import Week from '../components/Week';
import Bar from '../components/Bar';
import HistoryDialog from './HistoryDialog';
import AppSpeedDial from '../components/AppSpeedDial';

const mapStateToProps = (state, props) => {
    return {
        currentWeekId: getWeek(state),
        canManageTasks: canManageTasks(state),
        canManageTasksLessons: canManageTasksLessons(state),
        isClosedWeek: isClosedWeek(state),
        isSyncing: isFormSyncing('currentWeek')(state),
        weekLessonsPerDay: getWeekLessonsPerDay(state)
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { FillSchedule, OpenDialog, AddLesson, DeleteLesson },
        dispatch
    );
};

const styles = theme => ({
    main: {
        marginTop: 70,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 1200
    },
    tabContainer: {
        marginTop: theme.spacing(3)
    }
});

class Index extends Component {
    handleTab = (e, url) => {
        this.props.history.push(url);
    };

    onLessonMore = ({ week, day, lesson }) => {
        const {
            props: { OpenDialog }
        } = this;
        OpenDialog(week, day, lesson);
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
                weekLessonsPerDay,
                match: {
                    url,
                    params: { day }
                },
                FillSchedule,
                AddLesson,
                DeleteLesson
            },
            handleTab,
            onLessonMore
        } = this;

        const onlyDay = day ? parseInt(day, 10) : null;
        const isDay = !!day;

        return (
            <>
                <Bar title="Домашние задания" />
                <HistoryDialog />
                <div className={classes.main}>
                    <AppBar position="static" color="default">
                        <Tabs value={url} onChange={handleTab}>
                            <Tab value="/prev" label="Прошлая неделя" />
                            <Tab value="/" label="Эта неделя" />
                            <Tab value="/next" label="Следующая неделя" />
                        </Tabs>
                    </AppBar>
                    <Typography
                        component="div"
                        className={classes.tabContainer}
                    >
                        {currentWeekId ? (
                            <Week
                                week={currentWeekId}
                                day={onlyDay}
                                showSingleDay={isDay}
                                isClosedWeek={isClosedWeek}
                                isSyncing={isSyncing}
                                isTaskTextEditable={canManageTasks}
                                isLessonNameEditable={canManageTasksLessons}
                                onFillSchedule={FillSchedule}
                                onLessonMore={onLessonMore}
                                onDeleteLesson={DeleteLesson}
                                onAddLesson={AddLesson}
                                lessonsPerDay={weekLessonsPerDay}
                            />
                        ) : null}
                    </Typography>
                </div>
                <AppSpeedDial></AppSpeedDial>
            </>
        );
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withStyles(styles)
)(Index);
