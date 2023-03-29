import React, { useState, useEffect, useRef, forwardRef } from 'react'

//Grocery Bag Imports
import GroceryBagTile from './GroceryBagTile'

//Bootstrap Imports
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/esm/Overlay';

//Api Imports
import { updateCategory, sendPantryToServer } from '../FoodStockHelpers/pantryAPI';

//Icon Imports 
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineEllipsis, AiOutlineClose } from 'react-icons/ai'


function GroceryBagCategory({ categoryName, foodNames, _id, selected, setSelected, addNewFoodFunc, removeFoodFunc, editCatNameFunc }) {
    const [openAddNewFood, setOpenAddNewFood] = useState(false);
    const [canEditCategoryName, setCanEditCategoryName] = useState(false);
    const [canEditFoods, setCanEditFoods] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState([]);
    const newFoodInputRef = useRef(null);
    const categoryNameRef = useRef(null);

    // Functions handles a tile click, based off a type
    function handleTileClick(foodName, categoryName, expirationDate, ind, type) {
        // To add a food to the selected array
        if (type === "add") {
            setSelected([...selected, { foodName: foodName, categoryName: categoryName, expirationDate: expirationDate }])
        }
        // To remove a food from a category! not the selected array.
        // removing food from selected array is handled in selectedCateogry.js
        else if (type === "remove") {
            removeFoodFunc(_id, foodName);
        }
    }


    // Add New Food to Category
    async function _handleNewCatFoodSubmit(event) {
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

    }



    // Edit Category Name
    // async function handleEditCategoryName() {
    //     editCatNameFunc(_id, categoryNameRef.current.value, foodNames);
    //     setCanEditCategoryName(!canEditCategoryName);

    // }

    // Custom Edit Category Dropdown Toggle
    const EditCategoryDropDownToggle = forwardRef(({ children, onClick }, ref) => (
        <div
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
            {/* &#x25bc; */}
        </div>
    ));


    return (
        <div className='d-flex flex-column border'>
            <div className='col-12 d-flex'>
                <div className='col-12 d-inline-flex'>
                    <div className='col-auto ' >
                        {/* {categoryName} */}
                        <input
                            // className={"d-inline-block " + (canEditCategoryName ? "category-title-edit" : "category-title")}
                            className={"d-inline-block category-title"}
                            type="text"
                            defaultValue={categoryName}
                            readOnly={!canEditCategoryName}
                            ref={categoryNameRef} />
                        {/* { canEditCategoryName ? 
                            <AiOutlineCheckCircle size={20} onClick={handleEditCategoryName}/> 
                            : null } */}
                    </div>
                    <div className='col-auto ms-auto'>
                        {/* <AiOutlineEllipsis size={20} /> */}
                        <Dropdown>
                            <Dropdown.Toggle as={EditCategoryDropDownToggle} id="dropdown-custom-components">
                                <AiOutlineEllipsis size={20} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {/* <Dropdown.Item
                                    as="button"
                                    onClick={() => setCanEditCategoryName(!canEditCategoryName)}>
                                    Edit Category Name
                                </Dropdown.Item> */}
                                <Dropdown.Item
                                    as="button"
                                    onClick={() => setOpenAddNewFood(!openAddNewFood)}>
                                    Add Food
                                </Dropdown.Item>
                                <Dropdown.Item
                                    as="button"
                                    onClick={() => setCanEditFoods(!canEditFoods)}>
                                    Edit Foods
                                </Dropdown.Item>
                                <Dropdown.Item
                                    as="button">
                                    Remove Category
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>
                </div>


            </div>
            <div className='col-12 '>

                {foodNames?.map((foodName, index) => {
                    return (
                        <GroceryBagTile
                            foodName={foodName}
                            categoryName={categoryName}
                            key={foodName + _id}
                            handleClickFunc={handleTileClick}
                            index={index}
                            canEditFoods={canEditFoods}
                        />
                    )
                })
                }
            </div>

            <div className='add-food d-inline-flex align-items-center'>
                {openAddNewFood ?
                    <AiOutlineMinusCircle onClick={() => setOpenAddNewFood(!openAddNewFood)} size={20} />
                    : <AiOutlinePlusCircle onClick={() => setOpenAddNewFood(!openAddNewFood)} size={20} />}
                <div>
                    <Collapse in={openAddNewFood} dimension="width">
                        <div>
                            <form onSubmit={_handleNewCatFoodSubmit}>
                                <div className='d-inline-flex mx-2'>
                                    <input type="text" placeholder="Category Name" ref={newFoodInputRef} />
                                    <Button type="submit" variant="primary" size="sm">+</Button>
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
            </div>
        </div>
    )
}

export default GroceryBagCategory