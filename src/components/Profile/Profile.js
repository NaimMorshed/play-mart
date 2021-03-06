import React, { useContext } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import './Profile.css';
import firebaseConfig from '../../firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from 'react-router';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const Profile = () => {
    const [authentication, setAuthentication, cartItems, setCartItems] = useContext(UserContext);
    const history = useHistory()

    const logoutButton = () => {
        firebase.auth().signOut().then(() => {
            setAuthentication({
                loggedIn: false,
                email: '',
                displayName: '',
                photoUrl: ''
            })
            setCartItems([]);
            history.push('/login');
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div className="App">
            <Header />
            <div className="App-header profile-background">
                <img src={authentication.photoUrl} alt="" />
                <h1>{authentication.displayName}</h1>
                <h5>{authentication.email}</h5>
                <br />
                <br />
                <button onClick={logoutButton} className="log-out-btn">LOG OUT</button>
            </div>
        </div>
    );
};

export default Profile;