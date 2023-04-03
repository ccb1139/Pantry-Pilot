import React, { useState, useEffect, useRef, forwardRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai'

// Misc Imports
import DynamicInput from '../Structural/DynamicInput';


//Bootstrap Imports
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

/*Props:
    foodName: The name of the food item
    categoryName: The name of the category the food item belongs to
    selected: The array of selected food items
    handleClickFunc: Function used to send data back out of the tile
    inSelected: Boolean value saying if the current tile is in the selected array
    expDate: The expiration date of the food item
    ind: The index of the food item in the array
    canEdit: Boolean value saying if the food item can be edited
*/
function GroceryBagTile({ foodName, categoryName, handleClickFunc, inSelected, expDate, ind, canEditFoods }) {
    const [startDate, setStartDate] = useState(new Date(Date.now() + 12096e5));
    const [showEditPopover, setShowEditPopover] = useState(false);
    const foodNameRef = useRef(null);

    // Function used to handle the click event on a particular tile
    const _handleClick = () => {
        // Logic to 
        if (inSelected) {
            handleClickFunc(foodName, categoryName, startDate, ind);
        } else {
            handleClickFunc(foodName, categoryName, startDate, ind, "add");
        }
    }
    const handleRemove = () => {
        // if (inSelected) {
        //     handleClickFunc(foodName, categoryName, startDate, ind, "remove")
        // }
        handleClickFunc(foodName, categoryName, startDate, ind, "remove")
    }

    const handleNameEdit = (event) => {
        event.preventDefault();
        // console.log(foodNameRef.current.value);
        if(foodNameRef.current.value === foodName || foodNameRef.current.value.trim() === "") {
            return;
        }

        handleClickFunc(foodNameRef.current.value, categoryName, startDate, ind, "edit");
        
    }


    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => {
        const handleClick = () => {
            setStartDate(new Date(value));
            onClick();
            console.log("Clicked")
        };

        return (
            <button className="tile-custom-input" onClick={handleClick} ref={ref}>
                exp: {value}
            </button>
        );
    });
    return (
        <div className='grocery-bag-tile'>
            <div onClick={_handleClick} className="d-inline-flex" style={{ width: "auto" }}>
                {foodName}
            </div>
            {inSelected ? <div className='d-inline-flex'>
                <DatePicker
                    selected={expDate ? expDate : startDate}
                    onChange={(date) => {
                        setStartDate(date);
                        handleClickFunc(foodName, categoryName, date, ind, "update")
                    }}
                    customInput={<ExampleCustomInput />}
                />

            </div> : null}
            <div className='d-flex align-items-center'>
                <OverlayTrigger
                    trigger="click"
                    key={"bottom"}
                    placement={"bottom"}
                    defaultShow={showEditPopover}
                    show={showEditPopover}
                    onToggle={(show) => setShowEditPopover(!showEditPopover)}
                    rootClose
                    overlay={
                        <Popover id={`popover-positioned-bottom`}>
                            <Popover.Body>
                            <form onSubmit={handleNameEdit}>
                                <div className='d-inline-flex mx-2'>
                                    <input type="text" defaultValue={foodName} ref={foodNameRef} />
                                    <Button type="submit" variant="primary" size="sm">Done</Button>
                                </div>
                            </form>
                            </Popover.Body>
                        </Popover>}
                >
                    {canEditFoods ?
                        <div>
                            <AiOutlineEdit />
                        </div>
                        : <div></div>}
                </OverlayTrigger>
                {(inSelected || canEditFoods) ?
                    <div onClick={handleRemove}>
                        <AiOutlineClose />
                    </div> : null}
                {/* <div onClick={handleRemove}>
                <AiOutlineClose />
            </div> */}
            </div>
        </div>
    )
}

export default GroceryBagTile


{/* <OverlayTrigger
          trigger="click"
          key={placement}
          placement={placement}
          overlay={
            <Popover id={`popover-positioned-${placement}`}>
              <Popover.Header as="h3">{`Popover ${placement}`}</Popover.Header>
              <Popover.Body>
                <strong>Holy guacamole!</strong> Check this info.
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="secondary">Popover on {placement}</Button>
        </OverlayTrigger> */}