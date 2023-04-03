import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';

// css imports
import '../css/Fridge.css'
import '../css/Pantry.css'

//Pantry Component imports
import PantryHeader from '../Components/Pantry/PantryHeader';

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
  - Add a search bar
  - Add a sort by expiration date
  - Add a sort by quantity
  - add a sort by alphabetically
  - Add a sort by purchase date

View Features:
  - Add a list view | DONE
  - Add a category toggle
  - Add a way to view the total stock stats

Edit Features:
  - Add a way to edit the food name | DONE (NEED GUARD CONDITIONS)
  - Add a way to edit the expiration date | DONE (NEED GUARD CONDITIONS)
  - Add a way to edit the Category
  - Add a way to remove food from the pantry | DONE
  - Add a way to clear all expired items

Visual Features:
  - Add color coding for time till expiration date

Fixes:
  - Fix the Icons not refreshing when a new one is selected in the modal

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

  // console.log(pantry);

  return (
    <div className='pantry-container'>
      <div className='pantry-header-container col-3 border'>
        <PantryHeader
          pantry={pantry}
          setPantry={setPantry}
          viewType={viewType}
          setViewType={setViewType}
          categorySort={categorySort}
          setCategorySort={setCategorySort}
        />
      </div>

      <div className='pantry-body-container d-flex flex-column col-9 border '>
        <PantryBody
          pantry={pantry}
          setPantry={setPantry}
          viewType={viewType}
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