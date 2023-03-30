import React, { useState, useEffect } from 'react'

//Icon Imports
// import { GiBanana } from "react-icons/gi";
import { GiBanana } from "react-icons/gi";
import { GiChipsBag } from "react-icons/gi";


function PantryTile({ category, foodName, expirationDate, _id, }) {
    const [daysTillExp, setDaysTillExp] = useState(0);

    useEffect(() => {
        const targetDate = new Date(expirationDate);
        const today = new Date();
        const diffInMs = targetDate.getTime() - today.getTime();
        const daysUntilTarget = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        setDaysTillExp((daysUntilTarget < 0) ? "Expired!" : (daysUntilTarget + " days left"));
    }, [expirationDate])


    var icon = null
    switch (category) {
        case "Fruit":
            icon = <GiBanana size={40} />
            break;
        case "Snack":
            icon = <GiChipsBag size={40} />
            break;
    }


    return (
        <div className='pantry-tile row d-inline-flex border m-2 text-center align-items-center p-2'>
            <div className='col-auto '>
                {icon ? icon : null}
            </div>
            <div className='col-auto d-flex flex-column text-end'>
                <div className='pantry-tile-foodName col-auto'>
                    {foodName}
                </div>
                <div className='col-auto'>
                    {expirationDate?.substring(0, 10)}
                    <br />
                    {daysTillExp}
                </div>
                
            </div>


        </div>
    )
}

export default PantryTile