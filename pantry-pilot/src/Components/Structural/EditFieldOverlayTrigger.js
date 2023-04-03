import React, { useState, forwardRef } from 'react'

//Icon Imports
import { AiOutlineEdit } from 'react-icons/ai'

//Bootstrap Imports
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

//Date Imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditFieldOverlayTrigger({ enabled, defaultField, handleNameEdit, show, setShow, isDatePicker }) {
    const [fieldValue, setFieldValue] = useState(defaultField);

    const _handleNameEdit = (event) => {
        event.preventDefault();
        // console.log(fieldValue); 
        handleNameEdit(fieldValue);
        setShow(false);
    };

    const handleDateChange = (date) => {
        
        setFieldValue(date);
        // setShow(false);
    }

    const handleDatePickerDone = () => {
        handleNameEdit(fieldValue);
        setShow(false);
    }

    const handleChange = (event) => {
        setFieldValue(event.target.value);
    };

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => {
        const handleClick = () => {
            // setStartDate(new Date(value));
            onClick();
        };

        return (
            <button className="tile-custom-input" onClick={handleClick} ref={ref}>
                exp: {value}
            </button>
        );
    });

    return (
        <OverlayTrigger
            trigger="click"
            key={"bottom"}
            placement={"bottom"}
            defaultShow={show}
            show={show}
            onToggle={(_show) => setShow(!show)}
            rootClose
            overlay={
                <Popover id={`popover-positioned-bottom`}>
                    <Popover.Body>
                        {!isDatePicker ?
                            <form onSubmit={_handleNameEdit}>
                                <div className='d-inline-flex mx-2'>
                                    <input type="text" defaultValue={fieldValue} onChange={handleChange} />
                                    <Button type="submit" variant="primary" size="sm">Done</Button>
                                </div>
                            </form>
                            :
                            <div className='d-inline-flex align-items-center'>
                                <DatePicker
                                    selected={fieldValue}
                                    onChange={(date) => {
                                        handleDateChange(date);
                                    }}
                                    customInput={<ExampleCustomInput />}
                                />
                                <Button onClick={handleDatePickerDone} variant="primary" size="sm">Done</Button>

                            </div>}
                    </Popover.Body>
                </Popover>}
        >
            {enabled ?
                <div>
                    <AiOutlineEdit />
                </div>
                : <div></div>}
        </OverlayTrigger>
    )
}

export default EditFieldOverlayTrigger