import React, { useState, useEffect, useRef, forwardRef, useLayoutEffect } from 'react'

//Grocery Bag Imports
import GroceryBagTile from './GroceryBagTile'
import GroceryBagAddNewForm from './GroceryBagAddNewForm';

//Structural Imports
import IconSelectMenu from '../Structural/IconSelectMenu';

//Emoji Picker Imports
import { Emoji } from 'emoji-picker-react';

//Bootstrap Imports
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/esm/Overlay';
import { Modal } from 'react-responsive-modal';

//Api Imports
import { updateCategory, sendPantryToServer } from '../FoodStockHelpers/pantryAPI';

//Icon Imports 
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineEllipsis, AiOutlineClose, AiOutlineCheckCircle, AiOutlineDown, AiOutlineUp, AiOutlineEdit } from 'react-icons/ai'

type GroceryBagCategoryProps = {
    categoryName: string,
    foodNames: string[],
    _id: string,
    emoji: string,
    selected: any[],
    setSelected: React.Dispatch<React.SetStateAction<any[]>>,
    addNewFoodFunc: any,
    removeFoodFunc: any,
    editCatNameFunc: any,
    editTileNameFunc: any,
    removeCatFunc: any,
    updateEmojiFunc: any
}

function GroceryBagCategory({ categoryName, foodNames, _id, emoji, selected, setSelected, addNewFoodFunc, removeFoodFunc, editCatNameFunc, editTileNameFunc, removeCatFunc, updateEmojiFunc }: GroceryBagCategoryProps) {

    const [canEditCategoryName, setCanEditCategoryName] = useState<boolean>(false);
    const [canEditFoods, setCanEditFoods] = useState<boolean>(false);

    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
    const [categoryEmoji, setCategoryEmoji] = useState<any>(emoji);
    const [showFullCategory, setShowFullCategory] = useState<boolean>(false);
    const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
    const [overFlowCss, setOverFlowCss] = useState<string>("");

    const categoryNameRef = useRef<any>(null);
    const tileContainerRef = useRef<any>(null);
    // console.log(tileContainerRef)
    useEffect(() => {
        // console.log(categoryEmoji);
        updateEmojiFunc(_id, categoryEmoji);
    }, [categoryEmoji])

    useEffect(() => {
        const hasOverflow = tileContainerRef.current.scrollHeight > tileContainerRef.current.clientHeight;
        // console.log("hasOverflow:", hasOverflow);
        setIsOverflowing(hasOverflow);
        if(!hasOverflow){
            setOverFlowCss("-not-overflowing");
        }
            
    }, []);

    // Functions handles a tile click, based off a type
    function handleTileClick(foodName: string, categoryName: string, expirationDate: Date, ind: number, type: string) {
        // To add a food to the selected array
        if (type === "add") {
            setSelected([...selected, { foodName: foodName, categoryName: categoryName, expirationDate: expirationDate }])
        }
        // To remove a food from a category! not the selected array.
        // removing food from selected array is handled in selectedCateogry.js
        else if (type === "remove") {
            removeFoodFunc(_id, foodName);
        }
        else if (type === "edit") {
            // In this case foodName is an array of all the foodNames, with the 
            // appropriate changes made

            foodNames.splice(ind, 1, foodName);
            // editTileNameFunc(_id, categoryName, foodName)
            // console.log(_id, categoryName, foodNames, ind);
            editTileNameFunc(_id, categoryName, foodNames);
        }
    }

    function reCalcOverFlow() {
        const hasOverflow = tileContainerRef.current.scrollHeight > tileContainerRef.current.clientHeight;
        // console.log("hasOverflow:", hasOverflow);
        // setIsOverflowing(hasOverflow);
        console.log("overflow changed");
    }




    // Edit Category Name
    // async function handleEditCategoryName() {
    //     editCatNameFunc(_id, categoryNameRef.current.value, foodNames);
    //     setCanEditCategoryName(!canEditCategoryName);

    // }

    const doneWithChanges = () => {
        setCanEditCategoryName(false);
        setCanEditFoods(false);
    }

    type EditCategoryDropDownToggleProps = {
        children: any;
        onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    };


    // Custom Edit Category Dropdown Toggle
    const EditCategoryDropDownToggle = forwardRef(({ children, onClick }: EditCategoryDropDownToggleProps, ref: any) => (
        <div
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
    // console.log(showFullCategory, isOverflowing, categoryName)

    return (
        <div className='category d-flex flex-column'>
            <div className='category-header col-12 d-flex'>
                <div className='col-12 d-inline-flex'>
                    <div className='col-auto d-inline-flex align-items-center' >
                        <IconSelectMenu Icon={categoryEmoji} SetIcon={setCategoryEmoji} />
                        {/* <input
                            className={"d-inline-block category-title"}
                            type="text"
                            defaultValue={categoryName}
                            readOnly={!canEditCategoryName}
                            ref={categoryNameRef} /> */}
                        <div className='d-inline-block category-title'>{categoryName}</div>
                    </div>
                    <div className='col-auto ms-auto d-inline-flex align-items-center flex-column'>


                        <Dropdown>
                            <Dropdown.Toggle as={EditCategoryDropDownToggle} id="dropdown-custom-components">

                                {(canEditCategoryName || canEditFoods) ?
                                    (<div className='done-edit-check ms-auto'><AiOutlineCheckCircle size={25} onClick={doneWithChanges} /></div>)
                                    : <AiOutlineEllipsis size={25} />}

                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                <Dropdown.Item
                                    as="button"
                                    onClick={() => setCanEditFoods(!canEditFoods)}>
                                    Edit Foods
                                </Dropdown.Item>
                                <Dropdown.Item
                                    as="button"
                                    onClick={() => setShowConfirmDelete(!showConfirmDelete)}>
                                    Remove Category
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Modal open={showConfirmDelete} onClose={() => setShowConfirmDelete(!showConfirmDelete)} center>
                            <div className='d-flex flex-column'>
                                <div className='col-12 text-center'>
                                    <h3>Are you sure you want to delete the {categoryName} category?</h3>
                                </div>
                                <div className='col-12 d-flex justify-content-center'>
                                    <Button variant="danger" onClick={() => removeCatFunc(_id)}>Delete</Button>
                                    <Button variant="secondary" onClick={() => setShowConfirmDelete(!showConfirmDelete)}>Cancel</Button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>


            </div>
            <div className='grocery-bag-body'>
                <div ref={tileContainerRef} 
                className={'col-12 pe-1 grocery-bag-category-tile-container' + ((!showFullCategory ) ? '' : '-nohiddenOF') + overFlowCss }>

                    {foodNames?.map((foodName, index) => {
                        // console.log(categoryName, index)
                        return (
                            <GroceryBagTile
                                foodName={foodName}
                                categoryName={categoryName}
                                key={foodName + _id}
                                handleClickFunc={handleTileClick}
                                ind={index}
                                canEditFoods={canEditFoods}
                            />
                        )
                    })
                    }
                    <GroceryBagAddNewForm addNewFoodFunc={addNewFoodFunc} foodNames={foodNames} _id={_id} recalcOverflow={reCalcOverFlow} />
                </div>

                <div className='col-12 d-flex align-items-center justify-content-center' style={{ height: "24px" }}>
                    { isOverflowing &&
                        <div className='cat-expand-btn' onClick={() => { setShowFullCategory(!showFullCategory) }} >
                            {showFullCategory ? <AiOutlineUp size={20} /> : <AiOutlineDown size={20} />}
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default GroceryBagCategory