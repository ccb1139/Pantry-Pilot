import React, { useState, useEffect, useRef } from 'react'

//Bootstrap Imports
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

//API Imports
import {
    getCategoryEmojiByName,
    getCategories,
} from '../FoodStockHelpers/pantryAPI';

// Icon Imports
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

/*
STATS TO SHOW:
    - GENERAL OVERVIEW
        - Total Number of items in pantry
        - Number of items close to expiring 
        - Number of items that are expired
        - Number of items in each category
    - CATEGORY OVERVIEW
        - Number of items in each category
        - Number of items close to expiring in each category
        - Number of items that are expired in each category
        - How many of each item in each category



*/


type PantryTotalStockStatsProps = {
    pantry: any,
    setPantry: React.Dispatch<React.SetStateAction<any>>,
    stats: any
}

function PantryTotalStockStats({ pantry, setPantry, stats }: PantryTotalStockStatsProps) {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<object[]>(getCategories(pantry, setPantry));
    const [catgoriesQuantity, setCategoriesQuantity] = useState<number[]>([0]);



    return (
        <div className='total-stock-container border'>
            <Collapse in={open}>
                <div className='total-stock-stats'>
                    <div className='total-stock-stats-header'>
                        <h3>Total Stock Stats</h3>
                    </div>
                    <div className='total-stock-stats-body'>

                    </div>
                </div>
            </Collapse >
            <div className='d-flex justify-content-center ts-stats-tab-btn' onClick={() => setOpen(!open)}>
                {!open ?
                    <AiFillCaretDown className='ts-stats-tab-btn' size={30} onClick={() => setOpen(!open)} />
                    :
                    <AiFillCaretUp className='ts-stats-tab-btn' size={30} onClick={() => setOpen(!open)} />
                }
            </div>

        </div >
    )
}

export default PantryTotalStockStats