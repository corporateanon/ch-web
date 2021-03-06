import AppBar from '@material-ui/core/AppBar/AppBar';
import withStyles from '@material-ui/core/styles/withStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography/Typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import AppSpeedDial from '../components/AppSpeedDial';
import Bar from '../components/Bar';
import Week from '../components/Week';
import { canManageTasks, canManageTasksLessons } from '../ducks/Auth';
import { OpenDialog } from '../ducks/History';
import { FillTasksFromSchedule } from '../ducks/Schedule';
import { isFormSyncing } from '../ducks/Sync';
import {
    AddLesson,
    DeleteLesson,
    getWeek,
    getWeekLessonsPerDay,
    isClosedWeek
} from '../ducks/Week';
import { currentWeekId as getCurrentWeek } from '../lib/dateUtils';
import HistoryDialog from './HistoryDialog';

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
        { FillTasksFromSchedule, OpenDialog, AddLesson, DeleteLesson },
        dispatch
    );
};

const styles = theme => ({
    main: {
        // marginTop: 70,
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
                FillTasksFromSchedule,
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
                    <AppBar position="sticky" color="default">
                        <Tabs
                            variant="scrollable"
                            scrollButtons="on"
                            value={url}
                            onChange={handleTab}
                        >
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
                                onFillTasksFromSchedule={FillTasksFromSchedule}
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
