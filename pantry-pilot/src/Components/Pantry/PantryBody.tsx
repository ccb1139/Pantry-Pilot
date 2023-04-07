import React, { useState, useEffect } from 'react'

//Component Imports
import PantryTile from './PantryTile'
import PantryList from './PantryList'
import PantryDynamicShelves from './PantryDynamicShelves'

//Emmiter Imports
import { Events, eventEmitter } from '../Structural/Emitter';

//Api Imports
import {
  updateFridge,
  getCategoryEmojiByName,
  removeFromPantry,
  changeNameInPantry,
  sendPantryToServer
} from '../FoodStockHelpers/pantryAPI';

type PantryBodyProps = {
  pantry: any,
  setPantry: React.Dispatch<React.SetStateAction<any>>,
  viewType: string,
  categorySort: boolean,
  setCategorySort: React.Dispatch<React.SetStateAction<boolean>>
}

function PantryBody({ pantry, setPantry, viewType, categorySort, setCategorySort }: PantryBodyProps) {
  // const [_viewType, setViewType] = useState<string>(viewType);


  // eventEmitter.subscribe('changeViewType', (data: string) => {setViewType(data)});

  // Function to handle the click of a tile
  // Pass in the type and the nessicary information to the parent component
  function handleTileClick(type: string, subType: string, category: string, foodName: string | Date, expirationDate: string | Date, emoji: string, _id: string) {
    let newPantry;
    // console.log(type, category, foodName, expirationDate, emoji, _id);
    if (type === "remove") {
      removeFromPantry(foodName, category, expirationDate, pantry, setPantry).then((res: object) => {
        newPantry = res;
        sendPantryToServer(newPantry, pantry, setPantry);
      }).catch((err: any) => { console.log(err) })
    } else if (type === "edit") {
      console.log("edit", subType, category, foodName, expirationDate, emoji, _id);
      if (subType === "name") {
        console.log("Changing name");
        changeNameInPantry(foodName, category, expirationDate, _id, pantry, setPantry).then((res: object) => {
          newPantry = res;
          sendPantryToServer(newPantry, pantry, setPantry);
        }).catch((err: any) => { console.log(err) })
      } else if (subType === "date") {
        updateFridge(foodName, category, expirationDate, _id, pantry, setPantry).then((res: object) => {
          newPantry = res;
          sendPantryToServer(newPantry, pantry, setPantry);
        }).catch((err: any) => { console.log(err) })
      }
    }
  }

  return (
    <PantryDynamicShelves 
    pantry={pantry} 
    setPantry={setPantry} 
    viewType={viewType} 
    handleTileClick={handleTileClick}
    categorySort={categorySort}/>
  )
}

export default PantryBody
