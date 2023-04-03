import React, { useState, useEffect, useRef, forwardRef } from 'react'

//Pantry Imports
import PantryItemOptionsMenu from './PantryItemOptionsMenu';

//Emoji Imports
import { Emoji } from 'emoji-picker-react';

//Structure Imports
import EditFieldOverlayTrigger from '../Structural/EditFieldOverlayTrigger';

//Icon Imports 
import { AiOutlineCheckCircle } from 'react-icons/ai'

function PantryTile({ category, foodName, expirationDate, emoji, _id, handleTileClick }) {
    const [daysTillExp, setDaysTillExp] = useState(0);
    const [tileEmoji, setTileEmoji] = useState(emoji);
    const [canEditFoods, setCanEditFoods] = useState(false);

    const [showNameEditPopover, setShowNameEditPopover] = useState(false);
    const [showExpDateEditPopover, setShowExpDateEditPopover] = useState(false);
    const foodNameRef = useRef(null);

    useEffect(() => {
        if (emoji === -1) {
            setTileEmoji("1f353");
        }
    }, [emoji])

    useEffect(() => {
        const targetDate = new Date(expirationDate);
        const today = new Date();
        const diffInMs = targetDate.getTime() - today.getTime();
        const daysUntilTarget = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        setDaysTillExp((daysUntilTarget < 0) ? "Expired!" : (daysUntilTarget + " days left"));
    }, [expirationDate])



    // Handles delete food from pantry
    function handleRemove() {
        // console.log("Delete Clicked");
        // console.log("remove", category, foodName, expirationDate, emoji, _id);
        handleTileClick("remove", "none", category, foodName, expirationDate, emoji, _id);
    }

    function handleEdit() {
        setCanEditFoods(!canEditFoods);
    }

    function handleNameEdit(newValue) {
        console.log(newValue);
        handleTileClick("edit", "name", category, newValue, expirationDate, emoji, _id)
        setCanEditFoods(false);
    }
    function handleDateEdit(newValue) {
        console.log("date", newValue);
        handleTileClick("edit", "date", category, foodName, newValue, emoji, _id)
        setCanEditFoods(false);
    }


    return (
        <div className='pantry-list'>
            <div className='pantry-list-element col-2 '>
                {foodName}
                <EditFieldOverlayTrigger
                        enabled={canEditFoods}
                        defaultField={foodName}
                        handleNameEdit={handleNameEdit}
                        show={showNameEditPopover}
                        setShow={setShowNameEditPopover}
                    />
            </div>
            <div className='pantry-list-element col-4 justify-content-center'>
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
            <div className='pantry-list-element col-4 justify-content-center'>
                <Emoji unified={tileEmoji} />
                {category}
            </div>
            <div className='pantry-list-element col-2 justify-content-end'>
                    { canEditFoods ? <div className='done-edit-check'><AiOutlineCheckCircle size={25} onClick={() => { setCanEditFoods(false) }} /></div> : null}
                    <PantryItemOptionsMenu foodName={foodName} handleRemove={handleRemove} handleEdit={handleEdit} />
                </div>
            




        </div>
    )
}

export default PantryTile