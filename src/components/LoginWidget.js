import React, { Component } from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import { auth } from '../fb-app';

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/auth',
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
        const { state: { signedIn } } = this;
        if (signedIn) {
            return <div>Welcome, {auth.currentUser.displayName}</div>;
        } else {
            return <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
        }
    }
}
