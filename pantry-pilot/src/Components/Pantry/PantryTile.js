import React, { useState, useEffect } from 'react'

//Icon Imports
// import { GiBanana } from "react-icons/gi";
import { GiBanana } from "react-icons/gi";
import { GiChipsBag } from "react-icons/gi";


function PantryTile({ category, foodName, expirationDate, _id }) {
    var icon = null
    

    switch (category) {
        case "Fruit":
            icon = <GiBanana size={40}/>
            break;
        case "Snack":
            icon = <GiChipsBag size={40}/>
            break;
    }


    return (
        <div className='row d-inline-flex border m-2 text-center align-items-center p-2'>
            <div className='col-auto '>
                {icon ? icon : null}
            </div>
            <div className='col-auto'>
                {foodName}
            </div>
            <div className='col-auto'>
                {expirationDate?.substring(0, 10)}
            </div>

        </div>
    )
}

export default PantryTile