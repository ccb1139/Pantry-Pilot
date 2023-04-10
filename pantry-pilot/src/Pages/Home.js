import React from 'react'
import { useState, useEffect, useRef } from "react";
import axios from 'axios';

// css imports
import '../css/Fridge.css'
import '../css/Pantry.css'
import { Button } from 'react-bootstrap';

//Debug Imports
// import DebugMenu from '../Components/DebugMenu';

function Home() {
  const textInp = useRef(null);
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

  function handleClick() {
    console.log(textInp.current.value);
    getRecepie(textInp.current.value);
    // getRecepie('chicken');
  }

  function getsource(id){
    axios.post("https://api.spoonacular.com/recipes/"+id+"/information?apiKey=9cb66156f2cbe6f3abfde689784d385d").then(({ data }) => {
      console.log(data);
      // console.log(data);
    }
    )

  }

  function getRecepie(query){
    axios.get(`https://api.spoonacular.com/recipes/search?apiKey=374b61c440ca48e78c33ae7c2c6fa639&query=${query}` ).then(response => {
      console.log(response.data);
      // Do something with the response data here
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <div className='app-font'>
      <input className='spoontacular' type='text' placeholder='Search for a recipe...' ref={textInp}></input>
      <button className='spoontacular' onClick={handleClick}>Search</button>

      {/* <DebugMenu /> */}
    </div>
  )
}

export default Home