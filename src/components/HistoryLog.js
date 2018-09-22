import React, { Component } from 'react';
import { map } from 'lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Diff from './Diff';

class HistoryLog extends Component {
    render() {
        const {
            props: { history, classes }
        } = this;

        const items =
            history && history.length ? (
                map(history, ({ item, id }) => {
                    return (
                        <TableRow key={id}>
                            <TableCell padding="dense">
                                {item.dateStr}
                            </TableCell>
                            <TableCell padding="dense">
                                {item.displayName}
                            </TableCell>
                            <TableCell padding="dense">
                                <Diff prev={item.prevValue} next={item.value} />
                            </TableCell>
                        </TableRow>
                    );
                })
            ) : (
                <TableRow>
                    <TableCell>Нет изменений</TableCell>
                </TableRow>
            );
        return (
            <Paper className={classes.paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Дата</TableCell>
                            <TableCell>Пользователь</TableCell>
                            <TableCell>Запись</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{items}</TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(theme => ({
    paper: {
        width: '100%',
        overflowX: 'auto'
    }
}))(HistoryLog);
