import React, { useState, useEffect, useRef, forwardRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineClose } from 'react-icons/ai'

function GroceryBagTile({ foodName, categoryName, selected, setSelected, showDatePicker, ind }) {
    const [startDate, setStartDate] = useState(new Date());

    // console.log(ind)
    const handleClick = () => {
        if (selected) {
            if (showDatePicker) {
                setSelected(foodName, ind)
            } else {
                setSelected(foodName)
            }
        }
    }
    const handleRemove = () => {
        if (selected) {
            setSelected(foodName, ind, true)
        }
    }


    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (

        <button className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));
    return (
        <div className='d-inline-flex my-2 mx-1 border'>
            <div onClick={handleClick}>
                {foodName}
            </div>
            {showDatePicker ? <div className='d-inline-flex'>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    customInput={<ExampleCustomInput />}
                />
                <div onClick={handleRemove}>
                    <AiOutlineClose />
                </div>
            </div> : null}

        </div>
    )
}

export default GroceryBagTile