import React, { Component, Fragment } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Paper,
    Divider,
    ListSubheader
} from 'material-ui';
import moment from 'moment';
import _ from 'lodash';

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
