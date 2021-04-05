import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../App';
import Checkout from '../Checkout/Checkout';
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Orders = () => {
    const [authentication, setAuthentication, cartItems, setCartItems] = useContext(UserContext);

    //Backdrops
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleToggle = () => setOpen(!open);

    // GET data "email"
    const [games, setGames] = useState([]);
    useEffect(() => {
        handleToggle();
        fetch('https://calm-meadow-69908.herokuapp.com/getGames?token=' + authentication.email)
            .then(res => res.json())
            .then(data => {
                handleClose();
                setGames(data)
            })
            .catch(err => {
                handleClose();
                alert(err);
            })
    }, [])

    // Price calculation
    let totalPrice = 0;
    for (let i = 0; i < games.length; i++) {
        totalPrice += parseInt(games[i].price);
    }

    const deleteButtonClick = (data) => {
        const id = data._id;
        console.log(id);
        fetch(`https://calm-meadow-69908.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
        alert('Deleted, refresh to see changes')
    }

    return (
        <div className="App">
            <Header />
            <header className="App-header home-background">

                <div className="mt-4" />
                <div className="parent-div-cart mt-5">

                    {/* Table heading */}
                    <div className="row child-div-cart">
                        <div className="col-md-2"></div>
                        <div className="col-md-4 text-start"><h5>Description</h5></div>
                        <div className="col-md-2"><h5>Quantity</h5></div>
                        <div className="col-md-2"><h5>Price</h5></div>
                        <div className="col-md-2"><h5>Action</h5></div>
                    </div>
                    <hr /><br />

                    {/* Dynamic cart */}
                    {games.length === 0 && <h4>Cart is empty</h4>}
                    {
                        games.map(data => <Checkout data={data} deleteButton={() => deleteButtonClick(data)} />)
                    }
                    <br /><hr />

                    {/* Total section */}
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-4 text-start"><h5>Total</h5></div>
                        <div className="col-md-2">{games.length}</div>
                        <div className="col-md-2">${totalPrice}</div>
                        <div className="col-md-2"></div>
                    </div>

                </div>
                <div className="mb-3" />
                <br />

            </header>

            {/* Backdrop */}
            <div>
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>

        </div>
    );
};

export default Orders;