import React from 'react'
import { useState, useEffect, useRef } from "react";
import axios from 'axios';

// css imports
import '../css/Fridge.css'
import '../css/Pantry.css'
import { Button } from 'react-bootstrap';

//APi imports
import { sendPantryToServer, populateFoodStock } from '../Components/FoodStockHelpers/pantryAPI';

//Debug Imports
import DebugMenu from '../Components/Debug/DebugMenu';

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
      if(data.length === 0){
        console.log("NO PANTRY!")
        const tmpPantry = [{
          totalStock: [],
          categories: [
            {categoryName: "Fruits", unifiedEmoji: '1f353', foodNames: ["Apple", "Banana", "Orange", "Strawberry", "Blueberry", "Raspberry", "Mango", "Pineapple", "Watermelon", "Grapes", "Kiwi", "Peach", "Plum", "Pear", "Cherry", "Grapefruit", "Lemon", "Lime", "Pomegranate", "Cantaloupe", "Honeydew", "Dragonfruit", "Passionfruit"]},
            {categoryName: "Vegetables", unifiedEmoji: '1f966', foodNames: ["Carrot", "Potato", "Tomato", "Broccoli", "Cauliflower", "Cucumber", "Zucchini", "Squash", "Lettuce", "Spinach", "Kale", "Pepper", "Eggplant", "Onion", "Garlic", "Ginger", "Mushroom", "Asparagus", "Celery", "Radish", "Beet", "Turnip"]},
            {categoryName: "Protein", unifiedEmoji: '1f356', foodNames: ["Chicken", "Beef", "Pork", "Fish", "Lamb", "Turkey", "Sausage", "Bacon", "Ham", "Tofu", "Eggs"]},
            {categoryName: "Dairy", unifiedEmoji: '1f95b', foodNames: ["Milk", "Cheese", "Yogurt", "Butter", "Cream", "Ice Cream", "Sour Cream", "Cottage Cheese", "Whipped Cream", "Cream Cheese", "Feta Cheese", "Parmesan Cheese", "Mozzarella Cheese", "Cheddar Cheese", "Swiss Cheese", "Brie Cheese", "Gouda Cheese", "Provolone Cheese", "Ricotta Cheese"] },
            {categoryName: "Grains", unifiedEmoji: '1f35e', foodNames: ["Rice", "Pasta", "Bread", "Quinoa", "Barley", "Oats", "Couscous", "Buckwheat", "Polenta", "Tortillas", "Bagels", "Croissants", "Naan", "Pita Bread", "Sourdough Bread", "Cornbread", "Rye Bread", "Wheat Bread", "Focaccia", "English Muffins", "Matzo", "Hamburger Buns", "Hot Dog Buns", "Crackers", "Pretzels"]},
            {categoryName: "Snacks", unifiedEmoji: '1f37f', foodNames: ["Chips", "Popcorn", "Pretzels", "Trail Mix", "Nuts", "Seeds", "Jerky", "Granola Bars", "Energy Bars", "Crackers", "Rice Cakes", "Pita Chips", "Cheese Puffs", "Popcorn Balls", "Dried Fruit", "Fruit Snacks", "Gummy Candy", "Chocolate", "Cookies"]}
          ],
          fridge: []
        }]
        populateFoodStock(tmpPantry, pantry, setPantry)
      }
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

      <DebugMenu pantry={pantry} setPantry={setPantry}/>
    </div>
  )
}

export default Home