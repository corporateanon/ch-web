import React, { Component } from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import { auth } from '../fb-app';
import Button from '@material-ui/core/Button/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserAuthenticated } from '../ducks/Auth';

const mapStateToProps = (state, props) => {
    return {};
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ UserAuthenticated }, dispatch);
};

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

class LoginWidget extends Component {
    state = { signedIn: false };
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.UserAuthenticated(user);
            this.setState({ signedIn: !!user });
        });
    }
    render() {
        const { state: { signedIn }, props: { isLink } } = this;
        if (signedIn) {
            return <div>{auth.currentUser.displayName}</div>;
        } else {
            if (isLink) {
                return (
                    <Button color="inherit" href="/auth">
                        Login
                    </Button>
                );
            }
            return <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginWidget);
