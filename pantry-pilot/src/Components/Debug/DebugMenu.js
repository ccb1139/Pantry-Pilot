import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PantryVisHelp from './PantryVisHelp';
import FoodTileDebug from './FoodTileDebug';

// Helper imports
// import {
//     populateFoodStock,
//     clearFoodStock,

//     addCategory,
//     removeCategory,
//     updateCategory,
//     addFoodToCategory,
//     removeFoodFromCategory,
//     getCategory,
//     findInCategory,

//     addTotalStock,
//     removeTotalStock,
//     updateTotalStock,
//     increaseTotalStock,
//     decreaseTotalStock,
//     getTotalStock,
//     findInTotalStock,

//     addFridge,
//     removeFridge,
//     updateFridge,
//     getFridge,
//     findInFridge,

//     addToPantry,
//     removeFromPantry,
//     getPantry,

// } from '../FoodStockHelpers/foodStockHelper';

import {
    sendPantryToServer,

    populateFoodStock,
    clearFoodStock,

    addCategory,
    removeCategory,
    updateCategory,
    addFoodToCategory,
    removeFoodFromCategory,
    getCategory,
    findInCategory,

    addTotalStock,
    removeTotalStock,
    updateTotalStock,
    increaseTotalStock,
    decreaseTotalStock,
    getTotalStock,
    findInTotalStock,

    addFridge,
    removeFridge,
    updateFridge,
    getFridge,
    findInFridge,

    addToPantry,
    removeFromPantry,
    getPantry,

} from '../FoodStockHelpers/pantryAPI';


function DebugMenu({ pantry, setPantry, selected, setSelected }) {
    // ======================
    // RESET PANTRY FUNCTIONS
    // ======================
    const populateFridge = () => {
        const foodStock = {
            totalStock: [
                { foodName: 'Apple', category: 'Fruit', quantity: 1 },
                { foodName: 'Banana', category: 'Fruit', quantity: 2 },
                { foodName: 'Orange', category: 'Fruit', quantity: 0 },
                { foodName: 'Cheeto', category: 'Snack', quantity: 1 },
            ],
            categories: [
                { categoryName: 'Fruit', foodNames: ['Apple', 'Banana', 'Orange'], unifiedEmoji:"1f353" },
                { categoryName: 'Snack', foodNames: ['Cheeto', 'GoldFish', 'Lays'], unifiedEmoji:"1f37f" },
            ],
            fridge: [
                { foodName: 'Apple', category: 'Fruit', expirationDate: '2023-07-11' },
                { foodName: 'Banana', category: 'Fruit', expirationDate: '2023-02-29' },
                { foodName: 'Banana', category: 'Fruit', expirationDate: '2023-03-10' },
                { foodName: 'Cheeto', category: 'Snack', expirationDate: '2023-05-01' },
            ]


        }

        populateFoodStock(foodStock, pantry, setPantry);

    }
    const clearFridge = () => {
        clearFoodStock(pantry, setPantry);
    }

    const resetFridge = () => {
        clearFridge();
        populateFridge();
        window.location.reload();
    }

    // ======================
    // UPDATE INDIVIDUAL PANTY OBJECT FUNCTIONS
    // ======================

    // Add, Remove, Update Functions for Categories
    async function _addCategory() {
        const newPt = await addCategory('Staple', ['Flour', 'GoldFish', 'Lays'], pantry, setPantry)
        sendPantryToServer(newPt, pantry, setPantry)
    }
    async function  _removeCategory() {
        const newPT = removeCategory(pantry[0]['categories'][0]._id, pantry, setPantry)
        sendPantryToServer(newPT, pantry, setPantry)
    }
    async function  _updateCategory () {
        const newPT = updateCategory(pantry[0]['categories'][1]._id, ['Cheeto', 'GoldFish', 'Lays', 'Pringles'], pantry, setPantry)
        sendPantryToServer(newPT, pantry, setPantry)
    }
    async function  _addFoodToCategory () {
        const newPT = addFoodToCategory(pantry[0]['categories'][0]._id, 'Kiwi', pantry, setPantry)
        sendPantryToServer(newPT, pantry, setPantry)
    }
    async function  _removeFoodFromCategory () {
        const newPT = removeFoodFromCategory(pantry[0]['categories'][0]._id, 'Kiwi', pantry, setPantry)
        sendPantryToServer(newPT, pantry, setPantry)
    }

    async function  _getCategory () {
        const catRtn = getCategory(pantry[0]['categories'][0]._id, pantry, setPantry);
        console.log(catRtn);
    }

    async function  _findFoodInCategory () {
        const foodRtn = findInCategory('Kiwi', pantry, setPantry);
        console.log(foodRtn);
    }

    async function _addMultipleCategories() {
        const foodRtn = await addCategory('Staples', ['Flour', 'Sugar', 'Salt'], pantry, setPantry)
        const foodRtn2 = await addCategory('Meats', ['Chicken', 'Beef', 'Duck'], [foodRtn], setPantry)
        sendPantryToServer(foodRtn2, pantry, setPantry)
    }
    



    // Add, Remove, Update Functions for TotalStock
    const _addTotalStock = () => {
        const foodRtn = addTotalStock( 'Fruit', 'Apple', 2, pantry, setPantry)
    }
    const _removeTotalStock = () => {
        removeTotalStock( pantry[0]['totalStock'][0]._id, pantry, setPantry)
    }
    const _updateTotalStock = () => {
        updateTotalStock('Apple', 'Fruit', 5, pantry, setPantry)
    }
    const _increaseTotalStock = () => {
        increaseTotalStock('Apple', 'Fruit', 2, pantry, setPantry)
    }
    const _decreaseTotalStock = () => {
        decreaseTotalStock('Apple', 'Fruit', 2, pantry, setPantry)
    }
    const _getTotalStock = () => {
        const tsRtn = getTotalStock('Apple', 'Fruit', pantry, setPantry);
        console.log(tsRtn);
    }
    const _findInTotalStock = () => {
        const tsRtn = findInTotalStock('Apple', pantry, setPantry);
        console.log(tsRtn);
    }


    // Add, Remove, Update Functions for Fridge
    const _addFridge = () => {
        addFridge('Pear', 'Fruit', '2023-03-20', pantry, setPantry)
    }
    const _removeFridgeFood = () => {
        removeFridge(pantry[0]['fridge'][3]._id , pantry, setPantry)
    }
    const _updateFridgeFood = () => {
        updateFridge(pantry[0]['fridge'][0]._id, '2024-07-02', pantry, setPantry)
    }
    const _getFridge = () => {
        const fRtn = getFridge(pantry, setPantry);
        console.log(fRtn);
    }
    const _findInFridge = () => {
        const fRtn = findInFridge(pantry[0]['fridge'][0].foodName, pantry[0]['fridge'][0].category, pantry[0]['fridge'][0].expirationDate, pantry, setPantry);
        console.log(fRtn);
    }



    // ======================
    // UPDATE WHOLE PANTRY FUNCTIONS
    // ======================

    // Add, Remove, Update Functions for Pantry
    const _addToPantry = () => {
        addToPantry('Apple', 'Fruit', "2026-09-12", pantry, setPantry)
    }
    const _removeFromPantry = () => {
        removeFromPantry('Apple', 'Fruit', "2026-09-12", pantry, setPantry)
    }
    const _getPantry = () => {
        const pRtn = getPantry(pantry, setPantry);
        console.log(pRtn);
    }



    function logPantry() {
        console.log(pantry[0]);
    }
    function logTotalStock() {
        console.log(pantry[0].totalStock);
    }
    function logCategories() {
        console.log(pantry[0].categories);
    }
    function logFridge() {
        console.log(pantry[0].fridge);
    }

    return (
        <div className='container fixed-bottom border m-20 bg-light d-flex flex-column'>
            {/* <div className='d-flex flex-column'>
                <div style={{height:"200px", width:"auto"}}>
                    {pantry ?
                        pantry[0]?.fridge.map((item) => (
                            <FoodTileDebug key={item._id} _id={item._id} foodName={item.foodName} category={item.category} expirationDate={item.expirationDate}
                            deleteFunc={logPantry} />
                        ))
                        : null
                    }
                </div>       
                
            </div>
            <div className='d-flex flex-column'>
                {pantry ? <PantryVisHelp pantry={pantry} setPantry={setPantry}/> : null}
            </div> */}
            <div className='d-flex'>
                <p className='m-1'>For Debug:</p>
                <DropdownButton id="dropdown-item-button" title="ResetFS">
                    <Dropdown.Item as="button" onClick={populateFridge}>Populate FoodStock</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={clearFridge} >Clear FoodStock</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={resetFridge} >Reset FoodStock</Dropdown.Item>
                </DropdownButton>
{/*                 
                <DropdownButton id="dropdown-item-button2" title="CRUD CATGEORIES">
                    <Dropdown.Item as="button" onClick={_addCategory}>Add Categories</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_removeCategory}>Remove Categories</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_updateCategory}>Update Categories</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_addFoodToCategory}>Add Food to Category</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_removeFoodFromCategory}>Remove Food from Category</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_getCategory}>get Categories</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_findFoodInCategory}>Find Food in Category</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_addMultipleCategories}>Add _addMultipleCategories</Dropdown.Item>
                </DropdownButton>

                <DropdownButton id="dropdown-item-button2" title="CRUD TOTALSTOCK">
                    <Dropdown.Item as="button" onClick={_addTotalStock}>Add TotalStock Food</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_removeTotalStock}>remove TotalStock Food</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_updateTotalStock}>Update TotalStock Food</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_increaseTotalStock}>Increase TotalStock Food</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_decreaseTotalStock}>Decrease TotalStock Food</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_getTotalStock}>get TotalStock Food</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_findInTotalStock}>Find Food in TotalStock</Dropdown.Item>
                </DropdownButton>

                <DropdownButton id="dropdown-item-button2" title="CRUD FRIDGE">
                    <Dropdown.Item as="button" onClick={_addFridge}>Add Fridge Food</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_removeFridgeFood}>remove Fridge Food</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_updateFridgeFood}>Update Fridge Food</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_getFridge}>get Fridge Food</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_findInFridge}>Find Food in Fridge</Dropdown.Item>
                </DropdownButton>

                <DropdownButton id="dropdown-item-button2" title="CRUD PANTRY">
                    <Dropdown.Item as="button" onClick={_addToPantry}>Add to pantry</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_removeFromPantry}>remove from pantry</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={_getPantry}>get pantry</Dropdown.Item>
                </DropdownButton> */}

                <DropdownButton id="dropdown-item-button2" title="Logs">
                    <Dropdown.Item as="button" onClick={logPantry}>logPantry</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={logTotalStock}>logTotalStock</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={logCategories}>logCategories</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={logFridge}>logFridge</Dropdown.Item>
                </DropdownButton>


            </div>


        </div>
    )
}

export default DebugMenu