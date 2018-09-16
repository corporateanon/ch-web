import React, { Component, Fragment } from 'react';
import moment from 'moment';
import _ from 'lodash';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';

const DiffLine = props => props.value;
const AuthorLine = props => (
    <Fragment>
        <span>{props.displayName}</span>{' '}
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
                                            primary={<DiffLine {...item} />}
                                            secondary={<AuthorLine {...item} />}
                                        />
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
