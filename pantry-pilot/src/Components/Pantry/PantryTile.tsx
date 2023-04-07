import React, { useState, useEffect, useRef, forwardRef } from 'react'

//Pantry Imports
import PantryItemOptionsMenu from './PantryItemOptionsMenu';

//Emoji Imports
import { Emoji } from 'emoji-picker-react';

//Structure Imports
import EditFieldOverlayTrigger from '../Structural/EditFieldOverlayTrigger';

//Icon Imports 
import { IconContext } from "react-icons";
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { GiPlainCircle } from 'react-icons/gi'

type FieldValue = string | Date;
type PantryTileProps = {
    category: string,
    foodName: string,
    expirationDate: string | Date,
    emoji: string,
    _id: string,
    handleTileClick: (action: string, field: string, category: string, foodName: FieldValue, expirationDate: string | Date, emoji: string, _id: string) => void
}


function PantryTile({ category, foodName, expirationDate, emoji, _id, handleTileClick }: PantryTileProps) {
    const [daysTillExp, setDaysTillExp] = useState<string>("");
    const [indicatorColor, setIndicatorColor] = useState<string>("");
    const [tileEmoji, setTileEmoji] = useState<string>(emoji);
    const [canEditFoods, setCanEditFoods] = useState<boolean>(false);

    const [showNameEditPopover, setShowNameEditPopover] = useState<boolean>(false);
    const [showExpDateEditPopover, setShowExpDateEditPopover] = useState<boolean>(false);
;

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
        } else if (daysUntilTarget >= 1) {
            setIndicatorColor("#fcba03");
        } else {
            setIndicatorColor("red");
        }
        setDaysTillExp((daysUntilTarget <= 0) ? "Expired!" : (daysUntilTarget + " days left"));
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

    return (
        <div className='pantry-tile d-inline-flex '>
            <div className='col-12 pantry-tile-header'>
                <div className='d-flex align-items-center party-title-text'>
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
                <div className='d-inline-flex'>
                    {canEditFoods ? <div className='done-edit-check'><AiOutlineCheckCircle size={25} onClick={() => { setCanEditFoods(false) }} /></div> : null}
                    <PantryItemOptionsMenu foodName={foodName} handleRemove={handleRemove} handleEdit={handleEdit} />
                </div>
            </div>
            <div className='pantry-tile-body'>
                <div className='d-flex align-items-center'>
                    <IconContext.Provider value={{ color: indicatorColor, className: "exp-color-ind me-1" }}>
                        <GiPlainCircle size={10} />
                    </IconContext.Provider>
                    {daysTillExp}
                    <EditFieldOverlayTrigger
                        enabled={canEditFoods}
                        defaultField={new Date(expirationDate)}
                        handleNameEdit={handleDateEdit}
                        show={showExpDateEditPopover}
                        setShow={setShowExpDateEditPopover}
                        isDatePicker
                    />
                </div>

                <div className='d-flex align-items-center ms-auto'>
                    <div className='me-1'>
                        {category}
                    </div>
                    
                    <Emoji unified={tileEmoji} />

                </div>
            </div>


        </div>
    )
}

export default PantryTile