import React, { useState, useEffect } from 'react'

//Component Imports
import PantryTile from './PantryTile'
import PantryList from './PantryList'

//Api Imports
import {
  updateFridge,
  getCategoryEmojiByName,
  removeFromPantry,
  changeNameInPantry,
  sendPantryToServer
} from '../FoodStockHelpers/pantryAPI';

function PantryBody({ pantry, setPantry, viewType }) {

  // Function to handle the click of a tile
  // Pass in the type and the nessicary information to the parent component
  function handleTileClick(type, subType, category, foodName, expirationDate, emoji, _id) {
    let newPantry;
    // console.log(type, category, foodName, expirationDate, emoji, _id);
    if (type === "remove") {
      removeFromPantry(foodName, category, expirationDate, pantry, setPantry).then((res) => {
        newPantry = res;
        sendPantryToServer(newPantry, pantry, setPantry);
      }).catch((err) => { console.log(err) })
    } else if (type === "edit") {
      console.log("edit", subType, category, foodName, expirationDate, emoji, _id);
      if (subType === "name") {
        console.log("Changing name");
        changeNameInPantry(foodName, category, expirationDate, _id, pantry, setPantry).then((res) => {
          newPantry = res;
          sendPantryToServer(newPantry, pantry, setPantry);
        }).catch((err) => { console.log(err) })
      } else if (subType === "date") {
        updateFridge( foodName, category, expirationDate, _id, pantry, setPantry).then((res) => {
          newPantry = res;
          sendPantryToServer(newPantry, pantry, setPantry);
        }).catch((err) => { console.log(err) })
      }
    }
  }

  return (
    <div className='d-flex flex-wrap justify-content-center '>
      {pantry[0].fridge?.map((food) => {
        return (
          viewType === "grid" ?
            <PantryTile
              category={food.category}
              foodName={food.foodName}
              expirationDate={food.expirationDate}
              emoji={getCategoryEmojiByName(food.category, pantry)}
              _id={food._id}
              key={food._id}
              handleTileClick={handleTileClick}
            />
            :
            <PantryList
              category={food.category}
              foodName={food.foodName}
              expirationDate={food.expirationDate}
              emoji={getCategoryEmojiByName(food.category, pantry)}
              _id={food._id}
              key={food._id}
              handleTileClick={handleTileClick}
            />
        )
      })}



    </div>
  )
}

export default PantryBody
