import React, { useContext, useEffect, useState } from 'react';
//Backdrop import
import GameCard from '../GameCard/GameCard';
import Header from '../Header/Header';
import './Home.css';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../App';
import SnackbarUI from '../MeterialUI/SnackbarUI';
import ModalUI from '../Admin/BootstrapUI/ModalUI';
const useStyles = makeStyles((theme) => ({ backdrop: { zIndex: theme.zIndex.drawer + 1, color: '#fff', }, }));


const Home = () => {
    const [modalShow, setModalShow] = useState({ state: false, errorMessage: '' });
    const [authentication, setAuthentication, cartItems, setCartItems] = useContext(UserContext);
    const [callBackdrop, setCall] = useState(false);

    //Backdrops
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleToggle = () => setOpen(!open);

    // GET data "root"
    const [users, setUsers] = useState([]);
    useEffect(() => {
        handleToggle();
        fetch('https://calm-meadow-69908.herokuapp.com/getGames?token=root')
            .then(res => res.json())
            .then(data => {
                handleClose();
                setUsers(data)
            })
            .catch(err => {
                handleClose();
                setModalShow({ state: true, errorMessage: err.message })
            })
    }, [])

    const buyNow = data => {
        let tempArray = [];
        cartItems.map(x => tempArray.push(x))
        tempArray.push(data);
        setCartItems(tempArray);
        setCall(true);
    }

    return (
        <div className="App">
            <Header />
            <header className="App-header home-background">
                <h2>Game store: {users.length}</h2>
                <div className="card-container">
                    {
                        users.map(user => <GameCard data={user} buyButton={() => buyNow(user)}></GameCard>)
                    }
                </div>
            </header>

            {/* Backdrop */}
            <div>
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>

            {
                callBackdrop && <SnackbarUI message="Added to cart" />
            }

            {/* ModalUI */}
            {
                modalShow.state && <ModalUI heading="Error" body={modalShow.errorMessage} type="error" />
            }

        </div>
    );
};

export default Home;