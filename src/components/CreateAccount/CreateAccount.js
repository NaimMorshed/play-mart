import React, { useContext } from 'react';
import Header from '../Header/Header';
import logo from '../../images/login-logo.png';
import google from '../../images/google.png';
import firebaseConfig from '../../firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const CreateAccount = () => {

    const [authentication, setAuthentication] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                setAuthentication({
                    loggedIn: true,
                    email: user.email,
                    displayName: user.displayName,
                    photoUrl: user.photoURL
                });
                console.log(authentication);
                history.replace(from);
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    return (
        <div className="App">
            <Header />
            <div className="App-header login-background">
                <div className="parent-login-div">
                    <img src={logo} alt="" />
                    <h4>CREATE A <span className="sample-text">NEW ACCOUNT</span></h4>
                    <p><small className="blur-text">Create access to the gaming world</small></p>

                    <form className="login-form">
                        <input type="text" name="name" placeholder="Name" required/>
                        <input type="email" name="email" placeholder="Email" required/>
                        <input type="password" name="password" placeholder="Password" required/>
                        <input className="btn btn-primary" type="button" value="Login" />
                    </form>
                    <div className="mt-3"><p><small onClick={() =>history.push('/login')} className="account-text">I already have an account</small></p></div>
                    <div className="social-media">
                        <img onClick={googleSignIn} className="google" src={google} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;