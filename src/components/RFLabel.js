import React from 'react';
import { Field } from 'redux-form';

const Label = props => props.input.value;

const RFLabel = props => {
    const { name } = props;
    return <Field name={name} component={Label} {...props} />;
};

export default RFLabel;
