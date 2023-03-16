import React, { useState, useEffect, useRef, forwardRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function GroceryBagTile({ foodName, categoryName, showDatePicker }) {
    const [startDate, setStartDate] = useState(new Date());



    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        
        <button className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));
    return (
        <div className='d-inline-flex my-2 mx-1'>
            <div>
                {foodName}
            </div>
            {showDatePicker ? <div>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    customInput={<ExampleCustomInput />}
                />

            </div> : null}

        </div>
    )
}

export default GroceryBagTile