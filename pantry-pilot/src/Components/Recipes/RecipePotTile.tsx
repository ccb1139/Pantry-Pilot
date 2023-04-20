import React, { useState, useEffect, useRef, forwardRef } from 'react'

//Pantry Imports
import PantryItemOptionsMenu from '../Pantry/PantryItemOptionsMenu';

//Emoji Imports
import { Emoji } from 'emoji-picker-react';

// Draggable Imports
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';

//Structure Imports
import EditFieldOverlayTrigger from '../Structural/EditFieldOverlayTrigger';

//Icon Imports 
import { IconContext } from "react-icons";
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { GiPlainCircle } from 'react-icons/gi'
import { eventEmitter } from '../Structural/Emitter';

// Selected Ingredient Import Help
import { addToSelectedIngredients, removeFromSelectedIngredients } from '../FoodStockHelpers/selectedIngredients';

type FieldValue = string | Date;
type PantryTileProps = {
    category: string,
    foodName: string,
    expirationDate: string | Date,
    emoji: string,
    _id: string,
    handleTileClick: (action: string, field: string, category: string, foodName: FieldValue, expirationDate: string | Date, emoji: string, _id: string) => void,
    inSelectedIngredients: boolean,
}

const ItemTypes = {
    BOX: 'box',
}

interface BoxProps {
    name: string
}

interface DropResult {
    name: string
}

function RecipePotTile({ category, foodName, expirationDate, emoji, _id, handleTileClick, inSelectedIngredients }: PantryTileProps) {
    const [daysTillExp, setDaysTillExp] = useState<string>("");
    const [indicatorColor, setIndicatorColor] = useState<string>("");
    const [tileEmoji, setTileEmoji] = useState<string>(emoji);
    const [canEditFoods, setCanEditFoods] = useState<boolean>(false);
    const [dispatchFoodDropped, setDispatchFoodDropped] = useState<boolean>(false);

    const [showNameEditPopover, setShowNameEditPopover] = useState<boolean>(false);
    const [showExpDateEditPopover, setShowExpDateEditPopover] = useState<boolean>(false);


    const [{ isDragging }, drag] = useDrag(() => ({
        // "type" is required. It is used by the "accept" specification of drop targets.
        type: 'BOX',
        // The collect function utilizes a "monitor" instance (see the Overview for what this is)
        // to pull important pieces of state from the DnD system.
        item: { foodName, expirationDate, category, emoji, _id, inSelectedIngredients },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<DropResult>()
            // console.log("end", item, dropResult);
            if (item && dropResult) {

                if (dropResult.name === "Pot" && !inSelectedIngredients) {
                    // let debug = [...selectedIngredients];
                    // console.log("debug", debug);
                    // console.log("debug", selectedIngredients);
                    // handleSelectedIngredients("ADD", item);
                    // eventEmitter.dispatch("FOOD_DROPPED", item)
                    // setSelectedIngredients([...selectedIngredients, item]);
                } else if (dropResult.name === "Body" && inSelectedIngredients) {
                    // handleSelectedIngredients("REMOVE", item);
                }
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    useEffect(() => {
        if (emoji === "-1") {
            setTileEmoji("1f353");
        }
    }, [emoji])


    useEffect(() => {
        const targetDate = new Date(expirationDate);
        const today = new Date();
        const diffInMs = targetDate.getTime() - today.getTime();
        const daysUntilTarget = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        if (daysUntilTarget > 3) {
            setIndicatorColor("green");
        } else if (daysUntilTarget >= 0) {
            setIndicatorColor("#fcba03");
        } else {
            setIndicatorColor("red");
        }
        setDaysTillExp((daysUntilTarget < 0) ? "Expired!" : ((daysUntilTarget + 1) + " days left"));
    }, [expirationDate])



    // Handles delete food from pantry
    function handleRemove(): void {
        // console.log("Delete Clicked");
        // console.log("remove", category, foodName, expirationDate, emoji, _id);
        handleTileClick("remove", "none", category, foodName, expirationDate, emoji, _id);
    }

    function handleEdit(): void {
        setCanEditFoods(!canEditFoods);
    }

    function handleNameEdit(newValue: FieldValue): void {
        if (newValue === foodName) {
            setCanEditFoods(false);
            return;
        }
        if (newValue === "") {
            setCanEditFoods(false);
            return;
        }
        handleTileClick("edit", "name", category, newValue, expirationDate, emoji, _id)
        setCanEditFoods(false);
    }
    function handleDateEdit(newValue: FieldValue): void {
        if (newValue === expirationDate) {
            setCanEditFoods(false);
            return;
        }
        handleTileClick("edit", "date", category, foodName, newValue, emoji, _id)
        setCanEditFoods(false);
    }
    if (isDragging) {
        return <div ref={drag} />
    }
    return (
        <div role="Handle" ref={drag} className='pantry-list recipe-pot-tile'>
            <div className='pantry-list-element pantry-list-header col-6 mx-2'>
                {foodName}
                <EditFieldOverlayTrigger
                    enabled={canEditFoods}
                    defaultField={foodName}
                    handleNameEdit={handleNameEdit}
                    show={showNameEditPopover}
                    setShow={setShowNameEditPopover}
                    isDatePicker={false}
                />
            </div>
            <div className='pantry-list-element col-3 justify-content-center'>
                <IconContext.Provider value={{
                    color: indicatorColor,
                    className: "exp-color-ind mx-2"
                }}>
                    <GiPlainCircle size={10} />
                </IconContext.Provider>
                <div className='d-none'>
                    {daysTillExp}
                </div>

                <EditFieldOverlayTrigger
                    enabled={canEditFoods}
                    defaultField={new Date(expirationDate)}
                    handleNameEdit={handleDateEdit}
                    show={showExpDateEditPopover}
                    setShow={setShowExpDateEditPopover}
                    isDatePicker
                />
            </div>
            <div className='pantry-list-element col-3 justify-content-center'>


                {/* <div className='d-none'>
                        {category}
                    </div> */}
                <Emoji unified={tileEmoji} />

            </div>
            {/* <div className='pantry-list-element col-2 justify-content-end pe-4'>
                    {canEditFoods ? <div className='done-edit-check'><AiOutlineCheckCircle size={25} onClick={() => { setCanEditFoods(false) }} /></div> : null}
                    <PantryItemOptionsMenu foodName={foodName} handleRemove={handleRemove} handleEdit={handleEdit} />
                </div> */}





        </div>
    )
}

export default RecipePotTile