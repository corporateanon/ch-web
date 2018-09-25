import React from 'react';
import { Field } from 'redux-form';
import Switch from '@material-ui/core/Switch';

const SwitchComponent = ({ input: { value, ...input }, ...props }) => (
    <Switch {...input} {...props} checked={value} />
);

const RFSwitch = props => {
    const { name } = props;
    return <Field name={name} component={SwitchComponent} {...props} />;
};

export default RFSwitch;
