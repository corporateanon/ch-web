import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';
import { Welcome } from '@storybook/react/demo';
import React from 'react';
import TasksDayTable from '../components/TasksDayTable';

storiesOf('Welcome', module).add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')} />
));

storiesOf('Table', module).add('default', () => <TasksDayTable />);
