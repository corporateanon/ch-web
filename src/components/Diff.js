import React, { Component } from 'react';

import { diffChars } from 'diff';

export default class Diff extends Component {
    render() {
        const {
            props: { next, prev }
        } = this;
        const diff = diffChars(prev, next);
        console.log({ diff });
        return diff.map(({ value, added, removed }) => {
            return (
                <span
                    style={{
                        color: added ? 'green' : removed ? 'red' : 'gray',
                        textDecoration: removed ? 'line-through' : ''
                    }}
                >
                    {value}
                </span>
            );
        });
    }
}
