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
    setPantry: React.Dispatch<React.SetStateAction<any>>
}

function PantryTotalStockStats({ pantry, setPantry }: PantryTotalStockStatsProps) {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<object[]>(getCategories(pantry, setPantry));
    const [catgoriesQuantity, setCategoriesQuantity] = useState<number[]>([0]);

    useEffect(() => {
        setCategories(getCategories(pantry, setPantry));
        setCategoriesQuantity(Array(getCategories(pantry, setPantry).length).fill(0).map((_, index) => 0));
        console.log(catgoriesQuantity)
        console.log(categories)
    }, [pantry])


    return (
        <div className='total-stock-container border'>
            <Collapse in={open}>
                <div className='total-stock-stats'>
                    <div className='total-stock-stats-header'>
                        <h3>Total Stock Stats</h3>
                    </div>
                    <div className='total-stock-stats-body'>

                        {categories.map((category: any, index: number) => {
                            return (
                                <div key={index} className='total-stock-stats-item'>
                                    <div className='total-stock-stats-item-name'>
                                        <div className='total-stock-stats-item-amount'>
                                            {category.categoryName}:


                                            {pantry[0]?.totalStock?.map((item: any, index: number) => {
                                                if (item.category === category.categoryName && item.quantity > 0) {
                                                    return (
                                                        <>

                                                            <div key={index} className='total-stock-stats-item'>
                                                                <div className='total-stock-stats-item-name'>
                                                                    - {item.foodName} {item.quantity}
                                                                </div>
                                                                <div className='total-stock-stats-item-amount'>

                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )

                        })
                        }
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