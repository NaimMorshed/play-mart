import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const ModalUI = (props) => {
    const [smShow, setSmShow] = useState(true);

    return (
        <div>
            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header closeButton>
                    {
                        props.type === 'error' 
                        ? <Modal.Title id="example-modal-sizes-title-sm" style={{color: 'red'}}><ErrorIcon color="secondary"/>{props.heading}</Modal.Title>
                        : <Modal.Title id="example-modal-sizes-title-sm" style={{color: 'green'}}><CheckCircleIcon style={{ color: 'green' }}/>{props.heading}</Modal.Title>
                    }
                </Modal.Header>
                <Modal.Body>
                    {props.body}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ModalUI;