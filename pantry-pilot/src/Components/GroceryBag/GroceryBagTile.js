import React, { useState, useEffect, useRef, forwardRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineClose } from 'react-icons/ai'

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
    const [startDate, setStartDate] = useState(new Date());


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


    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => {
        const handleClick = () => {
            setStartDate(new Date(value));
            onClick();
            console.log("Clicked")
        };

        return (
            <button className="example-custom-input" onClick={handleClick} ref={ref}>
                {value}
            </button>
        );
    });
    return (
        <div className='d-inline-flex my-2 mx-1 border'>
            <div onClick={_handleClick}>
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

            
            {(inSelected || canEditFoods) ? 
            <div onClick={handleRemove}>
                <AiOutlineClose />
            </div> : null}
            {/* <div onClick={handleRemove}>
                <AiOutlineClose />
            </div> */}

        </div>
    )
}

export default GroceryBagTile