import React, { Component } from 'react';

import { diffChars } from 'diff';
import withStyles from '@material-ui/core/styles/withStyles';

const GREEN = '#E4FCE3';
const RED = '#FCE3E4';
const DEFAULT = 'none';

class Diff extends Component {
    render() {
        const {
            props: {
                next,
                prev,
                classes: { main }
            }
        } = this;
        const diff = diffChars(prev, next);
        const chain = diff.map(({ value, added, removed }, i) => {
            return (
                <span
                    key={i}
                    style={{
                        backgroundColor: added
                            ? GREEN
                            : removed
                                ? RED
                                : DEFAULT,
                        textDecoration: removed ? 'line-through' : ''
                    }}
                >
                    {value}
                </span>
            );
        });

        return <span className={main}>{chain}</span>;
    }
}

export default withStyles(theme => ({
    main: {
        whiteSpace: 'pre-wrap'
    }
}))(Diff);
