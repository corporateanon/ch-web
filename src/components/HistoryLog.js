import React, { Component } from 'react';
import { map } from 'lodash';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

export default class HistoryLog extends Component {
    render() {
        const { props: { history } } = this;

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
                            <TableCell padding="dense">{item.value}</TableCell>
                        </TableRow>
                    );
                })
            ) : (
                <TableRow>
                    <TableCell>Нет изменений</TableCell>
                </TableRow>
            );
        return (
            <Paper>
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
