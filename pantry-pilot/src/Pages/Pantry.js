import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';

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


function Pantry() {
  // This holds the foods in the users pantry dummy data for first load
  const [pantry, setPantry] = useState([{
    _id: "123", totalStock: [{ _id: "ts" }],
    categories: [{ _id: "ct" }, { foodNames: ["fn"] }],
    fridge: [{ _id: "fr" }]
  }])
  // 2 Views grid and list
  const [viewType, setViewType] = useState("grid");
  const [categorySort, setCategorySort] = useState(false);
  const [sortType, setSortType] = useState("NONE");
  const [statsInfoObject, setStatsInfoObject] = useState({});

  // This gets the food from the api
  useEffect(() => {
    console.log(pantry)
    axios.get("http://localhost:4000/foodStock/").then(({ data }) => {
      setPantry(data);
      console.log(data);
      // console.log(data);
    })
      .catch((error) => {
        console.log(error);
      });



  }, []);

  // Calculate the stats for the users foodstock
  useEffect(() => {
    
    // console.log(catgoriesQuantity)
    // console.log(categories)

    let tmpOverallStatsInfoObject = {
      numFoodItms: 0,
      numCloseToExp: 0,
      numExp: 0,
    };

    let tmpCatInfoObject = {
      categoryID: "",
      numFoodItms: 0,
      numCloseToExp: 0,
      numExp: 0,
    };

    let tmpFoodItmInfoObject = {
      foodItmIDs: [],
      foodItmName: "",
      numFoodItm: 0,
      numTimesAdded: 0,
    };

    let tmpFoodItmInfoObjectArray = [];

    for (let foodItm of pantry[0]?.fridge) {
      // Set Overall Stats
      tmpOverallStatsInfoObject.numFoodItms += 1; // Total Food Items
      if(new Date(foodItm.expirationDate) < new Date()){
        tmpOverallStatsInfoObject.numExp += 1; // Total Expired Food Items
      } else if(new Date(foodItm.expirationDate) < new Date().setDate(new Date().getDate() + 3)){
        tmpOverallStatsInfoObject.numCloseToExp += 1; // Total Food Items Close to Expiration
      }

      // Set Individual Food Item Stats
      tmpFoodItmInfoObject.foodItmIDs = foodItm._id;
      let itemInStatsArr = tmpFoodItmInfoObjectArray.findIndex((foodItmInfo) => foodItmInfo.foodItmName === foodItm.name);

      


      console.log(foodItm)

      // tmpOverallStatsInfoObject.numFoodItms += foodItm.quantity;
      // tmpFoodItmInfoObject.foodItmID = foodItm._id;
      // tmpFoodItmInfoObject.numFoodItm = foodItm.quantity;
      // tmpFoodItmInfoObject.numTimesAdded = foodItm.datesAdded.length;
    }

    let tmpstatsInfoObject = {};
    tmpstatsInfoObject["overall"] = tmpOverallStatsInfoObject;
    tmpstatsInfoObject["categories"] = tmpCatInfoObject;
    tmpstatsInfoObject["foodItms"] = tmpFoodItmInfoObjectArray;
    console.log(tmpstatsInfoObject)

  }, [pantry])

  // console.log(pantry);

  return (
    <div className='pantry-container app-font'>
      <div className='pantry-header-container col-3 '>
        <PantryHeader
          pantry={pantry}
          setPantry={setPantry}
          viewType={viewType}
          setViewType={setViewType}
          categorySort={categorySort}
          setCategorySort={setCategorySort}
          sortType={sortType}
          setSortType={setSortType}
          stats={statsInfoObject}
        />
        <PantryTotalStockStats
          pantry={pantry}
          setPantry={setPantry}
          stats={statsInfoObject}
        />
      </div>

      <div className='pantry-body-container d-flex flex-column col-7  '>
        <PantryBody
          pantry={pantry}
          setPantry={setPantry}
          viewType={viewType}
          categorySort={categorySort}
          setCategorySort={setCategorySort}
          sortType={sortType}
        />
      </div>
      {/* <div className='d-flex flex-column'>
        <GroceryBag />
      </div> */}

      <DebugMenu pantry={pantry} setPantry={setPantry} />
    </div>
  )
}

export default Pantry