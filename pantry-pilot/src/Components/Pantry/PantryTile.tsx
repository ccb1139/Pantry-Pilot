import React, { useState, useEffect, useRef, forwardRef } from 'react'

//Pantry Imports
import PantryItemOptionsMenu from './PantryItemOptionsMenu';

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

function PantryTile({ category, foodName, expirationDate, emoji, _id, handleTileClick, inSelectedIngredients }: PantryTileProps) {
    const [daysTillExp, setDaysTillExp] = useState<string>("");
    const [indicatorColor, setIndicatorColor] = useState<string>("");
    const [tileEmoji, setTileEmoji] = useState<string>(emoji);
    const [canEditFoods, setCanEditFoods] = useState<boolean>(false);
    const [dispatchFoodDropped, setDispatchFoodDropped] = useState<boolean>(false);

    const [showNameEditPopover, setShowNameEditPopover] = useState<boolean>(false);
    const [showExpDateEditPopover, setShowExpDateEditPopover] = useState<boolean>(false);


    const [{ isDragging, opacity }, drag, dragPreview] = useDrag(() => ({
        // "type" is required. It is used by the "accept" specification of drop targets.
        type: 'BOX',
        // The collect function utilizes a "monitor" instance (see the Overview for what this is)
        // to pull important pieces of state from the DnD system.
        item: { foodName, expirationDate, category, emoji, _id, inSelectedIngredients },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<DropResult>()
            if (item && dropResult) {

                if (dropResult.name === "Pot" && !inSelectedIngredients) {

                } else if (dropResult.name === "Body" && inSelectedIngredients) {
                    // handleSelectedIngredients("REMOVE", item);
                }
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            opacity: monitor.isDragging() ? 1 : 1,
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
        <div ref={dragPreview} 
        style={{
            position: "relative",
            zIndex: isDragging ? 100000 : 0,
          }}>
            <div role="Handle" ref={drag} className='pantry-tile d-inline-flex ' style={{ opacity: opacity, cursor: "grab" }}>
                <div className='col-12 pantry-tile-header'>
                    <div className='d-flex align-items-center party-title-text'>
                        <span className='pantry-tile-foodname'>{foodName}</span>
                        <EditFieldOverlayTrigger
                            enabled={canEditFoods}
                            defaultField={foodName}
                            handleNameEdit={handleNameEdit}
                            show={showNameEditPopover}
                            setShow={setShowNameEditPopover}
                            isDatePicker={false}
                        />
                    </div>
                    <div className='d-inline-flex'>
                        {canEditFoods ?
                            <div className='done-edit-check edit-in-anim'><AiOutlineCheckCircle size={25} onClick={() => { setCanEditFoods(false) }} /></div>
                            : <PantryItemOptionsMenu foodName={foodName} handleRemove={handleRemove} handleEdit={handleEdit} />}
                        {/* <PantryItemOptionsMenu foodName={foodName} handleRemove={handleRemove} handleEdit={handleEdit} /> */}
                    </div>
                </div>

                <div className='pantry-tile-body flex-column'>
                    <div className='d-flex align-items-center justify-content-between'>


                        <div className='me-1'>
                            {category}
                        </div>

                        <div className='col-3 d-flex justify-content-end '>
                            <Emoji unified={tileEmoji} />
                        </div>
                    </div>

                    <div className='d-flex align-items-center justify-content-between'>
                        {daysTillExp}
                        <EditFieldOverlayTrigger
                            enabled={canEditFoods}
                            defaultField={new Date(expirationDate)}
                            handleNameEdit={handleDateEdit}
                            show={showExpDateEditPopover}
                            setShow={setShowExpDateEditPopover}
                            isDatePicker
                        />
                        <IconContext.Provider value={{ color: indicatorColor, className: "exp-color-ind me-1  d-inline-flex justify-content-end" }}>
                            <GiPlainCircle size={10} />
                        </IconContext.Provider>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PantryTile