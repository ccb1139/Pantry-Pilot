import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';

// Helper imports
import {populateFoodStock, clearFoodStock, updateFoodStockCategory } from '../FoodStockHelpers/foodStockHelper';


function DebugMenu({ pantry, setPantry, selected, setSelected }) {
    // For testing purposes
    const populateFridge = () => {
        const foodStock = {
            totalStock: [
                {foodName: 'Apple', category: 'Fruit', quantity: 1},
                {foodName: 'Banana', category: 'Fruit', quantity: 2},
                {foodName: 'Orange', category: 'Fruit', quantity: 1},
            ],
            categories: [
                {categoryName: 'Fruit', foodNames: ['Apple', 'Banana', 'Orange']},
            ],
            fridge: [
                {foodName: 'Apple', category: 'Fruit', expirationDate: '2021-05-01'},
                {foodName: 'Banana', category: 'Fruit', expirationDate: '2021-05-01'},
                {foodName: 'Banana', category: 'Fruit', expirationDate: '2021-05-01'},
            ]


        }

        populateFoodStock(foodStock, pantry, setPantry);

    }
    const clearFridge = () => {
        clearFoodStock(pantry, setPantry);
    }

    const _updateFoodStockCategory = () => {
        updateFoodStockCategory('Snack', ['Cheeto', 'GoldFish', 'Lays'], pantry, setPantry)
    }

    function logPantry() {
        console.log(pantry);
    }

    return (
        <div className='container fixed-bottom border m-20 bg-light d-flex'>
            <p className='m-1'>For Debug:</p>

            <button onClick={populateFridge}>Populate FoodStock</button>
            <button onClick={clearFridge}>Clear FoodStock</button>
            <button onClick={_updateFoodStockCategory}>Add FoodStock Categories</button>
            <button onClick={logPantry}>logPantry</button>
        </div>
    )
}

export default DebugMenu