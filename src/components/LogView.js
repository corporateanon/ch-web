import React, { Component, Fragment } from 'react';
import { List, ListItem, ListItemText, Paper, Divider } from 'material-ui';
import moment from 'moment';

const DiffLine = props => props.value;
const AuthorLine = props => (
    <Fragment>
        <span>{props.displayName}</span>{' '}
        <span title={moment(props.timestamp).toLocaleString()}>
            {moment(props.timestamp).fromNow()}
        </span>
    </Fragment>
);

export default class LogView extends Component {
    render() {
        const {
            props: { items }
        } = this;

        return (
            <Paper>
                <List>
                    {items.map((item, i) => (
                        <Fragment key={i}>
                            <ListItem>
                                <ListItemText
                                    primary={<DiffLine {...item} />}
                                    secondary={<AuthorLine {...item} />}
                                />
                            </ListItem>
                            {i < items.length - 1 && <Divider />}
                        </Fragment>
                    ))}
                </List>
            </Paper>
        );
    }
}
