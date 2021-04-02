import React, { useContext } from 'react';
import './Cart.css';
//Backdrop import
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

const Cart = () => {
    // const [cartItems, setCartItems] = useContext(UserContext);
    const [authentication, setAuthentication, cartItems, setCartItems] = useContext(UserContext);

    //Backdrop
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleToggle = () => setOpen(!open);

    // Price calculation
    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
        totalPrice += parseInt(cartItems[i].price);
    }

    const saveAllOrders = () => {

        // Change token
        let newArray = { ...cartItems };
        for (let i in newArray) {
            if (newArray[i].token === "root") {
                newArray[i].token = authentication.email;
            }
        }

        fetch('http://localhost:5000/addGames', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newArray)
        })
            .then(res => res.json())
            .then(data => {
                alert('Added to orders')
            })
    }

    const clearOrders = () => {
        setCartItems([]);
    }

    return (
        <div className="App">
            <Header />
            <header className="App-header home-background">

                <div className="parent-div-cart">

                    {/* Table heading */}
                    <div className="row child-div-cart">
                        <div className="col-md-1"></div>
                        <div className="col-md-7 text-start"><h5>Description</h5></div>
                        <div className="col-md-2"><h5>Quantity</h5></div>
                        <div className="col-md-2"><h5>Price</h5></div>
                    </div>
                    <hr /><br />

                    {/* Dynamic cart */}
                    {cartItems.length === 0 && <h4>Cart is empty</h4>}
                    {
                        cartItems && cartItems.map(data => <Checkout data={data} />)
                    }
                    <br /><hr />

                    {/* Total section */}
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-7 text-start"><h5>Total</h5></div>
                        <div className="col-md-2">{cartItems.length}</div>
                        <div className="col-md-2">${totalPrice}</div>
                    </div>

                </div>
                <br />
                {
                    cartItems.length !== 0 &&
                    <div>
                        <button onClick={saveAllOrders} className="save-order-button">Save Orders</button>
                        <button onClick={clearOrders} className="clear-order-button">Clear</button>
                    </div>
                }
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

export default Cart;