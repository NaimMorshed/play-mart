import React, { useState } from 'react';
import './Add.css';
import Backdrop from '@material-ui/core/Backdrop';
import checked from '../../../images/checked.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
const backdropStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
const axios = require('axios').default;


const Add = () => {

    //----------- Modal -------------
    const [open, setOpen] = React.useState(false);
    const [modalDialog, setModalDialog] = useState({
        head: '',
        body: '',
        buttonText: ''
    });
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = (head, body, buttonText) => {
        setModalDialog({ head: head, body: body, buttonText: buttonText })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // --------- SPINNER -------------
    const backdropClasses = backdropStyles();
    const [backdropOpen, setBackdropOpen] = useState(false);
    const backdropClose = () => {
        setBackdropOpen(false);
    };
    const backdropToggle = () => {
        setBackdropOpen(!backdropOpen);
    };
    //--------------------------------

    const [userData, setUserData] = useState({
        token: "root",
        name: undefined,
        price: undefined,
        discount: undefined,
        released: undefined,
        image: undefined,
        hasImage: false,
        validate: false
    });

    const handleImage = event => {
        const imageData = new FormData();
        imageData.set('key', '2e6b03bfb364d782703bbc4ad0f67996');
        imageData.append('image', event.target.files[0])

        backdropToggle();
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                const newObj = { ...userData };
                newObj.image = response.data.data.display_url;
                newObj.hasImage = true;
                setUserData(newObj);
                backdropClose();
            })
            .catch(function (error) {
                backdropClose();
                alert(error)
            });
    }

    const inputFieldUpdates = event => {

        if (event.target.name === 'name') {
            const newObj = { ...userData };
            newObj.name = event.target.value;
            setUserData(newObj);
        } else if (event.target.name === 'price') {
            const newObj = { ...userData };
            newObj.price = event.target.value;
            setUserData(newObj);
        } else if (event.target.name === 'discount') {
            const newObj = { ...userData };
            newObj.discount = event.target.value;
            setUserData(newObj);
        } else if (event.target.name === 'released') {
            const newObj = { ...userData };
            newObj.released = event.target.value;
            setUserData(newObj);
        } else { }

        if (userData.name && userData.price && userData.discount && userData.released && userData.hasImage) {
            const newObj = { ...userData };
            newObj.validate = true;
            setUserData(newObj);
        }

    }

    const saveButton = () => {
        if (userData.validate) {
            const arrayData = [{ ...userData }];
            backdropToggle();
            // POST data "root"
            fetch('http://localhost:5000/addGames', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(arrayData)
            })
                .then(res => res.json())
                .then(data => {
                    backdropClose();
                    handleClickOpen("Hurray!", "Game data has been successfully added to the server", "Done");
                    cancelButton();
                })
                .catch(err => {
                    backdropClose();
                    handleClickOpen("Oops!", "This ended up with an error", "Try Again");
                })

        } else {
            backdropClose();
            handleClickOpen("Oops!", "Stand back and fill the fields patiently", "Try Again");
        }
    }

    const cancelButton = () => {
        document.getElementById('name').value = '';
        document.getElementById('price').value = '';
        document.getElementById('discount').value = '';
        document.getElementById('released').value = '';
        setUserData({
            name: undefined,
            price: undefined,
            discount: undefined,
            released: undefined,
            image: undefined,
            hasImage: false,
            validate: false
        })
        
    }

    return (
        <div className="App">
            <div className="admin-heading"><h2>Add games to the store</h2></div>
            <br />
            <div className="d-flex justify-content-center admin-body">
                <div className="photo-div">
                    {
                        userData.hasImage
                            ? <img src={userData.image} alt="" />
                            : <input type="file" onChange={handleImage} />
                    }
                </div>
                <div className="d-flex justify-content-center flex-column align-items-center">

                    <div className="row d-flex align-items-center">
                        <div className="col-md-5 text-end">Game Name:</div>
                        <div className="col-md-6"><input onChange={inputFieldUpdates} id="name" name="name" type="text" placeholder="Enter game name" /></div>
                        <div className="col-md-1">
                            {
                                userData.name && <img src={checked} alt="" />
                            }
                        </div>
                    </div><br />

                    <div className="row d-flex align-items-center">
                        <div className="col-md-5 text-end">Add Price: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <div className="col-md-6"><input onChange={inputFieldUpdates} id="price" name="price" type="number" placeholder="Enter price" /></div>
                        <div className="col-md-1">
                            {
                                userData.price && <img src={checked} alt="" />
                            }
                        </div>
                    </div><br />

                    <div className="row d-flex align-items-center">
                        <div className="col-md-5 text-end">Discounted Price:</div>
                        <div className="col-md-6"><input onChange={inputFieldUpdates} id="discount" name="discount" type="number" placeholder="Mention discount price" /></div>
                        <div className="col-md-1">
                            {
                                userData.discount && <img src={checked} alt="" />
                            }
                        </div>
                    </div><br />

                    <div className="row d-flex align-items-center">
                        <div className="col-md-5 text-end">Released Year:</div>
                        <div className="col-md-6"><input onChange={inputFieldUpdates} id="released" name="released" type="number" placeholder="Enter released year" /></div>
                        <div className="col-md-1">
                            {
                                userData.released && <img src={checked} alt="" />
                            }
                        </div>
                    </div><br /><br />

                    <div className="mt-2">
                        <button onClick={saveButton} className="save-button">SAVE</button>
                        <button onClick={cancelButton} className="cancel-button">Cancel</button>
                    </div>

                    {/* Backdrop */}
                    <div>
                        <Backdrop className={backdropClasses.backdrop} open={backdropOpen}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </div>

                    {/* Modal */}
                    <div>
                        {/* To Open => handleClickOpen(); */}
                        <Dialog
                            fullScreen={fullScreen}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">{modalDialog.head}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {
                                        modalDialog.body
                                    }
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary" autoFocus>
                                    {
                                        modalDialog.buttonText
                                    }
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Add;