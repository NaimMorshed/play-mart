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

    //Backdrops
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const [authentication, setAuthentication, cartItems, setCartItems] = useContext(UserContext);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        handleToggle();
        fetch('http://localhost:5000/getGames?token=' + authentication.email)
            .then(res => res.json())
            .then(data => {
                handleClose();
                console.log(data);
                setUsers(data)
            })
            .catch(err => {
                handleClose();
                alert(err);
            })
    }, [])

    // Price calculation
    // let totalPrice = 0;
    // for (let i = 0; i < setUsers.length; i++) {
    //     totalPrice += parseInt(setUsers[i].price);
    // }

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
                    {users.length === 0 && <h4>Cart is empty</h4>}
                    {
                        users && users.map(data => <Checkout data={data} />)
                    }
                    <br /><hr />

                    {/* Total section */}
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-7 text-start"><h5>Total</h5></div>
                        <div className="col-md-2">{cartItems.length}</div>
                        <div className="col-md-2">$</div>
                    </div>

                </div>
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