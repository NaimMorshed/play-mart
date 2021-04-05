import React from 'react';
import './Checkout.css';
import deleteIcon from '../../images/delete.png';

const Checkout = (props) => {

    const { name, price, image } = props.data;

    return (
        <div>
            <div className="row child-div-cart">
                <div className="col-md-2"><img className="custom-img" src={image} alt="" /></div>
                <div className="col-md-4 text-start m-auto">{name}</div>
                <div className="col-md-2 m-auto">1</div>
                <div className="col-md-2 m-auto">${price}</div>
                <div className="col-md-2 m-auto">
                    <button onClick={() => props.deleteButton()}><img src={deleteIcon} alt="" /></button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;