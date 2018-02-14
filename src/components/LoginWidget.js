import React, { Component } from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import { auth } from '../fb-app';
import Button from 'material-ui/Button/Button';


const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

export default class LoginWidget extends Component {
    state = { signedIn: false };
    componentDidMount() {
        firebase
            .auth()
            .onAuthStateChanged(user => this.setState({ signedIn: !!user }));
    }
    render() {
        const { state: { signedIn }, props: { isLink } } = this;
        if (signedIn) {
            return <div>{auth.currentUser.displayName}</div>;
        } else {
            if (isLink) {
                return <Button color="inherit" href="/auth">Login</Button>;
            }
            return <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
        }
    }
}
