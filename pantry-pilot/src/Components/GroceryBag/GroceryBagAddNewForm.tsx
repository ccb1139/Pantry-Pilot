import React, { useState, useEffect, useRef } from 'react'

// Bootstrap Imports
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/esm/Overlay';

//Icon Imports 
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineClose } from 'react-icons/ai'


type Props = {
    addNewFoodFunc: any,
    foodNames: string[],
    _id: string,
    recalcOverflow: any
}

function GroceryBagAddNewForm({ addNewFoodFunc, foodNames, _id, recalcOverflow }: Props) {
    const [openAddNewFood, setOpenAddNewFood] = useState<boolean>(false);
    const newFoodInputRef = useRef<any>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMsg, setAlertMsg] = useState<string[]>([]);

    // Add New Food to Category
    async function _handleNewCatFoodSubmit(event: any) {
        event.preventDefault(); // prevent the default form submission

        // Gaurd Conditions for adding category
        var tmpAlrtMSG = [];
        if (newFoodInputRef.current.value === "") {
            tmpAlrtMSG.push("Please enter a food name");
        }
        if (foodNames.find((food) => food.trim().toLowerCase() === newFoodInputRef.current.value.trim().toLowerCase())) {
            tmpAlrtMSG.push("Food already exists");
        }
        if (tmpAlrtMSG.length > 0) {
            setAlertMsg(tmpAlrtMSG);
            setShowAlert(true);
            return;
        } else {
            setAlertMsg([]);
            setShowAlert(false);
        }
        setAlertMsg(tmpAlrtMSG);
        addNewFoodFunc(newFoodInputRef.current.value, _id);
        newFoodInputRef.current.value = "";
    }



    return (
        <div className='d-inline-flex align-items-center px-1'>
            <div>
                {openAddNewFood ?
                    <AiOutlineMinusCircle onClick={() => {setOpenAddNewFood(!openAddNewFood); recalcOverflow();}} size={20} />
                    : <AiOutlinePlusCircle onClick={() => {setOpenAddNewFood(!openAddNewFood); recalcOverflow();}} size={20} />}
            </div>
            <Collapse in={openAddNewFood} dimension="width">
                <div>
                    <form onSubmit={_handleNewCatFoodSubmit}>
                        <div className='d-flex mx-2 new-food-input-div'>
                            <input type="text" placeholder="Food Name" ref={newFoodInputRef} className='new-food-input' />
                            {/* <Button type="submit" variant="primary" size="sm">+</Button> */}
                            <button type='submit' className='grocery-bag-submit-btn-sm'>Add</button>
                        </div>
                    </form>
                    <Overlay show={showAlert} target={newFoodInputRef.current} placement="bottom">
                        <Popover id="add-category-alert" >
                            <Popover.Body className='d-flex align-items-center'>
                                {alertMsg.map((msg) => (
                                    <div>{msg}</div>
                                ))}
                                <div className="ms-2">
                                    <AiOutlineClose onClick={() => setShowAlert(false)} size={15} />
                                </div>

                            </Popover.Body>
                        </Popover>
                    </Overlay>
                </div>
            </Collapse>

        </div>
    )
}

export default GroceryBagAddNewForm