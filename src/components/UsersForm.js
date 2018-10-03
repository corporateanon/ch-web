import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm, formValues, FormSection } from 'redux-form';
import { compose, mapProps } from 'recompose';
import UserFormSection from './UserFormSection';

const styles = theme => ({});

const UsersForm = ({ userIds, myUid }) => {
    if (!userIds) {
        return null;
    }
    return (
        <FormSection name="users">
            {userIds.map(id => (
                <UserFormSection myUid={myUid} id={id} key={id} />
            ))}
        </FormSection>
    );
};

export default compose(
    reduxForm({
        form: 'users',
        enableReinitialize: true,
        destroyOnUnmount: false
    }),
    formValues('users'),
    mapProps(({ users, ...props }) => {
        return { userIds: users ? Object.keys(users) : null, ...props };
    }),
    withStyles(styles)
)(UsersForm);
