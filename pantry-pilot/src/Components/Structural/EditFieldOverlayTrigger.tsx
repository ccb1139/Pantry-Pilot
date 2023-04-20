import React, { useState, forwardRef, ForwardedRef } from 'react'

//Icon Imports
import { AiOutlineEdit } from 'react-icons/ai'

//Bootstrap Imports
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

//Date Imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


type FieldValue = string | Date;
type Props = {
    enabled: boolean,
    defaultField: string|Date,
    handleNameEdit: (newValue: FieldValue) => void,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    isDatePicker: boolean,
}

function EditFieldOverlayTrigger({ enabled, defaultField, handleNameEdit, show, setShow, isDatePicker }: Props) {
    
    const [fieldValue, setFieldValue] = useState<FieldValue>(defaultField);

    const _handleNameEdit = (event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        // console.log(fieldValue); 
        handleNameEdit(fieldValue);
        setShow(false);
    };

    const handleDateChange = (date: Date) => {
        console.log(date);  
        setFieldValue(date);
        // setShow(false);
    }

    const handleDatePickerDone = () => {
        handleNameEdit(fieldValue);
        setShow(false);
    }

    const handleChange = (event: any ) => {
        setFieldValue(event.target.value);
    };

    const ExampleCustomInput = forwardRef<string, any>(({ value, onClick }, ref: any) => {
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
                                    selected={new Date(fieldValue)}
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
                <div className='edit-in-anim '>
                    <AiOutlineEdit />
                </div>
                : <div></div>}
        </OverlayTrigger>
    )
}

export default EditFieldOverlayTrigger