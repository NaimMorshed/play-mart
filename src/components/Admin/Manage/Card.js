import React from 'react';
import editIcon from '../../../images/edit.png';
import deleteIcon from '../../../images/delete.png';

const Card = (props) => {

    const { name, price, discount, released, image } = props.data;

    return (
        <div className="row mt-3 mb-3">
            <div className="col-md-3"><h5 className="text-start">{name}</h5></div>
            <div className="col-md-3"><h5>${price}</h5></div>
            <div className="col-md-3"><h5>{released}</h5></div>
            <div className="col-md-3">
                <button onClick={() => props.editButton()} class="mr-2"><img src={editIcon} alt=""/></button>
                <button onClick={() => props.deleteButton()}><img src={deleteIcon} alt=""/></button>

            </div>
        </div>
    );
};

export default Card;