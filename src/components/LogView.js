import React, { Component, Fragment } from 'react';
import moment from 'moment';
import _ from 'lodash';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import { weekAndDayToDate } from '../lib/dateUtils';
import Diff from './Diff';

const DiffLine = ({ prevValue, value }) => (
    <Diff prev={prevValue} next={value} />
);

const ContextLine = withStyles(theme => ({
    main: {
        color: '#888',
        fontSize: 'smaller'
    }
}))(({ week, day, lesson, lessonName, classes: { main } }) => {
    const date = weekAndDayToDate(week, day);
    return (
        <div className={main}>
            {lessonName} ({lesson | (0 + 1)} урок) на{' '}
            {moment(date).format('dddd D MMMM')}
        </div>
    );
});

const AuthorLine = props => (
    <Fragment>
        <span>{props.displayName}</span>
        {' в '}
        <span title={moment(props.timestamp).toLocaleString()}>
            {moment(props.timestamp).format('HH:mm')}
        </span>
    </Fragment>
);

const groupItemsByDay = items =>
    _(items)
        .chain()
        .groupBy(_ => moment(_.timestamp).format('YYYY-MM-DD'))
        .toPairs()
        .value();

export default class LogView extends Component {
    render() {
        const {
            props: { items }
        } = this;

        const itemGroups = groupItemsByDay(items);

        return (
            <Paper>
                <List>
                    {itemGroups.map(([key, items], i) => (
                        <Fragment key={i}>
                            {i > 0 && <Divider />}
                            <ListSubheader color="primary">{key}</ListSubheader>
                            {items.map((item, i) => (
                                <Fragment key={i}>
                                    <ListItem>
                                        <ListItemText
                                            secondary={<AuthorLine {...item} />}
                                        >
                                            <ContextLine {...item} />
                                            <DiffLine {...item} />
                                        </ListItemText>
                                    </ListItem>
                                </Fragment>
                            ))}
                        </Fragment>
                    ))}
                </List>
            </Paper>
        );
    }
}
