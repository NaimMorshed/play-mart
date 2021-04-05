import React, { useEffect, useState } from 'react';
import './Manage.css';
//Backdrop import
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Card from './Card';
//Alert import
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SnackbarUI from '../../MeterialUI/SnackbarUI';
import ModalUI from '../BootstrapUI/ModalUI';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Manage = () => {
    const [modalShow, setModalShow] = useState(false);
    const [callBackdrop, setCall] = useState(false);

    // Backdrop
    const classes = useStyles();
    const [backdropOpen, setBackdropOpen] = React.useState(false);
    const backdropClose = () => setBackdropOpen(false);
    const backdropToggle = () => setBackdropOpen(!backdropOpen);

    // Alert
    const [open, setOpen] = React.useState(false);
    const [previousData, setPreviousData] = useState({});
    const alertOpen = () => setOpen(true);
    const alertClose = () => setOpen(false);
    const alertUpdate = () => {
        setOpen(false);
        const gameName = document.getElementById('gameName').value;
        const gamePrice = document.getElementById('gamePrice').value;
        const discountPrice = document.getElementById('discountPrice').value;
        const releasedYear = document.getElementById('releasedYear').value;

        const newData = { ...previousData };
        newData.name = gameName;
        newData.price = gamePrice;
        newData.discount = discountPrice;
        newData.released = releasedYear;

        const id = newData._id;

        fetch(`https://calm-meadow-69908.herokuapp.com/delete/${id}`, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(data => {
                alert("Edited")
            })

    }
    const alertCancel = () => setOpen(false);

    // GET data "root"
    const [users, setUsers] = useState([]);
    useEffect(() => {
        backdropToggle();
        fetch('https://calm-meadow-69908.herokuapp.com/getGames?token=root')
            .then(res => res.json())
            .then(data => {
                backdropClose();
                setUsers(data)
            })
            .catch(err => {
                backdropClose();
                alert(err);
            })
    }, [])

    const editButtonClick = (data) => {
        setPreviousData({ ...data });
        alertOpen();
    }

    const deleteButtonClick = (data) => {
        const id = data._id;
        console.log(id);
        fetch(`https://calm-meadow-69908.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
        setCall(true);
        // .then(res => res.json())
        // .then(res => {
        //     alert('Deleted')
        // })
        // .catch(err => {
        //     alert(err)
        // })
    }

    return (
        <div className="App">
            <div className="admin-heading"><h2>Manage games collection</h2></div>
            <div className="total-table-div">
                <div className="row mt-5 table-head">
                    <div className="col-md-3 text-start"><h5>Game Name</h5></div>
                    <div className="col-md-3"><h5>Price</h5></div>
                    <div className="col-md-3"><h5>Year</h5></div>
                    <div className="col-md-3"><h5>Action</h5></div>
                </div>
                <br />
                {
                    users.map(data =>
                        <Card
                            data={data}
                            editButton={() => editButtonClick(data)}
                            deleteButton={() => deleteButtonClick(data)}
                        ></Card>)
                }

            </div>

            {/* Backdrop */}
            <div>
                <Backdrop className={classes.backdrop} open={backdropOpen}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>

            {/* Alert */}
            <div>
                <Dialog open={open} onClose={alertClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the forms to make any changes
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="gameName"
                            label="Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="gamePrice"
                            label="Price"
                            type="number"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="discountPrice"
                            label="Discount Price"
                            type="number"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="releasedYear"
                            label="Released Year"
                            type="number"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={alertCancel} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={alertUpdate} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            {
                callBackdrop && <SnackbarUI message="Deleted" />
            }

            {/* ModalUI */}
            {
                modalShow && <ModalUI heading="Deleted" body="Item deleted successfully" type="error" />
            }

        </div>
    );
};

export default Manage;