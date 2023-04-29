import React, { useState, useEffect, useRef, forwardRef } from 'react'

//Pantry Imports
import PantryItemOptionsMenu from '../../Pantry/PantryItemOptionsMenu';

//Emoji Imports
import { Emoji } from 'emoji-picker-react';

//Structure Imports
import EditFieldOverlayTrigger from '../../Structural/EditFieldOverlayTrigger';

//Icon Imports 
import { IconContext } from "react-icons";
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { GiPlainCircle } from 'react-icons/gi'
import { eventEmitter } from '../../Structural/Emitter';

//Bootstrap Imports
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// Selected Ingredient Import Help
import { addToSelectedIngredients, removeFromSelectedIngredients } from '../../FoodStockHelpers/selectedIngredients';

type FieldValue = string | Date;
type PantryTileProps = {
    category: string,
    foodName: string,
    expirationDate: string | Date,
    emoji: string,
    _id: string,
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

function RecipeFoodTile({ category, foodName, expirationDate, emoji, _id }: PantryTileProps) {
    const [daysTillExp, setDaysTillExp] = useState<string>("");
    const [indicatorColor, setIndicatorColor] = useState<string>("");
    const [tileEmoji, setTileEmoji] = useState<string>(emoji);
    const [canEditFoods, setCanEditFoods] = useState<boolean>(false);
    const [dispatchFoodDropped, setDispatchFoodDropped] = useState<boolean>(false);

    const [showNameEditPopover, setShowNameEditPopover] = useState<boolean>(false);
    const [showExpDateEditPopover, setShowExpDateEditPopover] = useState<boolean>(false);



    useEffect(() => {
        if (emoji === "-1") {
            setTileEmoji("1f353");
        }
    }, [emoji])


    useEffect(() => {
        if (expirationDate === "-1") {
            setIndicatorColor("grey");
            return
        }

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

    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            {category}
        </Tooltip>
    );

    return (
        <div role="Handle" className='recipe-food-tile recipe-pot-tile'>
            <div className='recipe-food-tile-header col-6 mx-2'>
                {foodName}

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

            </div>
            <OverlayTrigger
                placement='right'
                delay={{ show: 150, hide: 400 }}
                overlay={renderTooltip}
            >
                <div className='pantry-list-element col-3 justify-content-center'>


                    <Emoji unified={tileEmoji} />

                </div>
            </OverlayTrigger>





        </div>
    )
}

export default RecipeFoodTile