import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function FoodTileDebug({ category, expirationDate, foodName, _id, deleteFunc, editFunc }) {
    const handleDelete = () => {
        deleteFunc(category, expirationDate, foodName, _id);
    }

    const handleEdit = () => {
        editFunc(category, expirationDate, foodName, _id);
    }


    return (
        <Draggable bounds="parent">
            <div className="food-tile border d-inline-flex flex-column m-1 p-1">
                <div className="food-tile-category">{category}</div>
                <div className="food-tile-name">{foodName}</div>
                <div className="food-tile-expiration">{(expirationDate)?.substring(0, 10)}</div>
                <DropdownButton title="Edit">
                    <Dropdown.Item as="button" onClick={handleDelete}>Delete</Dropdown.Item>
                    <Dropdown.Item as="button" >Edit</Dropdown.Item>
                </DropdownButton>
            </div>

        </Draggable>
    );
}

export default FoodTileDebug;
