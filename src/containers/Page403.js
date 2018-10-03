import React, { Component, Fragment } from 'react';
import Bar from '../components/Bar';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';

const styles = theme => ({
    main: {
        marginTop: 70,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 600
    }
});

class Page403 extends Component {
    render() {
        const {
            props: { classes }
        } = this;
        return (
            <Fragment>
                <Bar title="Просмотр запрещён" />
                <div className={classes.main}>
                    Нет прав для просмотра этой страницы
                </div>
            </Fragment>
        );
    }
}

export default compose(withStyles(styles))(Page403);
