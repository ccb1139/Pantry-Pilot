import React from 'react'
import { useState, useEffect } from "react";


// css imports
import '../css/Fridge.css'
import '../css/Pantry.css'

//Pantry Component imports
import PantryHeader from '../Components/Pantry/PantryHeader';
import PantryTotalStockStats from '../Components/Pantry/PantryTotalStockStats';

// GroceryBag Component imports
import GroceryBag from '../Components/GroceryBag/GroceryBag';

// DebugMenu Component imports
import DebugMenu from '../Components/Debug/DebugMenu';
import PantryBody from '../Components/Pantry/PantryBody';

// Stats Component imports
import { calculateStats } from '../Components/FoodStockHelpers/stats';

// Dnd Imports
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

// Image Imports
import CuttingBoard from '../img/cuttingboard.png'

/*
==============================
TO-DO:
Layout:
  - Add sidebar with filter and view options | IN PROGRESS

Filter Features:
  - Add a search bar | DONE
    - Made categories with no results hide
  - Add a sort by expiration date | DONE
  - Add a sort by quantity | IN PROGRESS
  - add a sort by alphabetically | DONE
  - Add a sort by purchase date

View Features:
  - Add a list view | DONE
  - Add a category toggle | DONE
  - Add a way to view the total stock stats

Edit Features:
  - Add a way to edit the food name | DONE 
  - Add a way to edit the expiration date | DONE 
  - Add a way to edit the Category
  - Add a way to remove food from the pantry | DONE
  - Add a way to clear all expired items

Visual Features:
  - Add color coding for time till expiration date | DONE

Fixes:
  - Fix the Icons not refreshing when a new one is selected in the modal
  - remeber user settings for view and filter

Refactor:
  - Change the filtering system to use eventEmitter

STRETCH GOALS:
  - Tag System
*/


function Pantry({pantry, setPantry}:any) {
  // This holds the foods in the users pantry dummy data for first load
  
  // 2 Views grid and list
  const [viewType, setViewType] = useState("grid");
  const [categorySort, setCategorySort] = useState(false);
  const [sortType, setSortType] = useState("NONE");
  const [statsInfoObject, setStatsInfoObject] = useState({});

  // This gets the food from the server
 

  // Calculate the stats for the users foodstock
  useEffect(() => {

    // console.log(catgoriesQuantity)
    // console.log(categories)

    /* We need to track:
      - Total number of items
      - Total number of categories
      - Total number of items
      - Total number of items in each category

      - Total number of items close to expiring 
      - Total number of expired items
    */
    calculateStats(pantry).then((stats) => {
      // console.log(stats)
      setStatsInfoObject(stats)
    })
  }, [pantry])

  // console.log(pantry);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='window-container container d-flex justify-content-center'
      //  style={{backgroundImage: `url(${CuttingBoard})`}}
       >
        <div className='pantry-container h-100 app-font col-12 '>
          <div className='pantry-header-container col-3'> {/*Add Sticky Top */}
            <PantryHeader
              pantry={pantry}
              setPantry={setPantry}
              viewType={viewType}
              setViewType={setViewType}
              categorySort={categorySort}
              setCategorySort={setCategorySort}
              sortType={sortType}
              setSortType={setSortType}
              tsStats={statsInfoObject}
            />
            <PantryTotalStockStats
              pantry={pantry}
              setPantry={setPantry}
              stats={statsInfoObject}
            />
          </div>

          <div className='pantry-body-container d-flex flex-column col-9  '>
            <PantryBody
              pantry={pantry}
              setPantry={setPantry}
              viewType={viewType}
              categorySort={categorySort}
              sortType={sortType}
              stats={statsInfoObject}
            />
          </div>
          {/* <div className='d-flex flex-column'>
        <GroceryBag />
      </div> */}
        </div>
        {/* <DebugMenu pantry={pantry} setPantry={setPantry} /> */}
      </div>
    </DndProvider>
  )
}

export default Pantry