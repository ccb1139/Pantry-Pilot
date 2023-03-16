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

function Pantry() {
  // This holds the foods in the users pantry
  const [pantry, setPantry] = useState([{
    _id: "123", totalStock: [{ _id: "ts" }],
    //categories: [{ _id: "ct" }],
    fridge: [{ _id: "fr" }]
  }])

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
    <div className='d-flex justify-content-center align-items-center'>
      <div className='d-flex flex-column col-10 border'>
        <PantryHeader pantry={pantry} setPantry={setPantry} />
        <PantryBody pantry={pantry} setPantry={setPantry} />
      </div>
      {/* <div className='d-flex flex-column'>
        <GroceryBag />
      </div> */}
      <DebugMenu pantry={pantry} setPantry={setPantry} />
    </div>
  )
}

export default Pantry