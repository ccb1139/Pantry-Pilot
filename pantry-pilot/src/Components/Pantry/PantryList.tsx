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
type PantryListProps = {
    category: string,
    foodName: string,
    expirationDate: string | Date,
    emoji: string,
    _id: string,
    handleTileClick: (type: string, subType: string, category: string, foodName: FieldValue, expirationDate: string | Date, emoji: string, _id: string) => void
}


function PantryTile({ category, foodName, expirationDate, emoji, _id, handleTileClick }: PantryListProps) {
    const [daysTillExp, setDaysTillExp] = useState<string>("");
    const [indicatorColor, setIndicatorColor] = useState<string>("");
    const [tileEmoji, setTileEmoji] = useState<string>(emoji);
    const [canEditFoods, setCanEditFoods] = useState<boolean>(false);

    const [showNameEditPopover, setShowNameEditPopover] = useState<boolean>(false);
    const [showExpDateEditPopover, setShowExpDateEditPopover] = useState<boolean>(false);

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
        <div className='pantry-list'>
            <div className='pantry-list-element pantry-list-header col-lg-3 col-4 mx-2'>
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
            <div className='pantry-list-element col-lg-4 col-2 justify-content-center'>
                <IconContext.Provider value={{
                    color: indicatorColor,
                    className: "exp-color-ind mx-2"
                }}>
                    <GiPlainCircle size={10} />
                </IconContext.Provider>
                <div className='d-none d-lg-block'>
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


                <div className='mx-1 d-none d-lg-block'>
                    {category}
                </div>
                <Emoji unified={tileEmoji} />

            </div>
            <div className='pantry-list-element col-2 justify-content-end pe-4'>
                {canEditFoods ? <div className='done-edit-check'><AiOutlineCheckCircle size={25} onClick={() => { setCanEditFoods(false) }} /></div> : null}
                <PantryItemOptionsMenu foodName={foodName} handleRemove={handleRemove} handleEdit={handleEdit} />
            </div>





        </div>
    )
}

export default PantryTile