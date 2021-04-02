import React from 'react';
import { useHistory } from 'react-router';
import Header from '../Header/Header';
import './Welcome.css';

const Welcome = () => {
    const history = useHistory()
    return (
        <div className="App">
            <Header/>
            <header className="App-header background">
                <h1 className="text">GRAB YOUR GAMES<br/>NOW!</h1>
                <h4 className="text">Up to 70% off</h4>
                <br/>
                <button onClick={()=>{history.push('/home')}} className="shop-now-btn">SHOP NOW</button>
            </header>
        </div>
    );
};

export default Welcome;