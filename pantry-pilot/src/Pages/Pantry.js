import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';

// css imports
import '../css/Fridge.css'

//Pantry Component imports
import PantryHeader from '../Components/Pantry/PantryHeader';

// GroceryBag Component imports
import GroceryBag from '../Components/GroceryBag/GroceryBag';

// DebugMenu Component imports
import DebugMenu from '../Components/Debug/DebugMenu';

function Pantry() {
  // This holds the foods in the users pantry
  const [pantry, setPantry] = useState()

  // This gets the food from the api
  useEffect(() => {
    axios.get("http://localhost:4000/foodStock/").then(({ data }) => {
      setPantry(data);
      console.log(data);
    })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(pantry);

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='d-flex flex-column'>
        <PantryHeader />
      </div>
      <div className='d-flex flex-column'>
        <GroceryBag />
      </div>
      <DebugMenu pantry={pantry} setPantry={setPantry}/>
    </div>
  )
}

export default Pantry