import React, { useState, useEffect, useRef, useMemo } from 'react'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import axios from 'axios';

//Page imports
import Home from './Pages/Home';
import Pantry from './Pages/Pantry';
import Recipes from './Pages/Recipes';
import Cookbook from './Pages/Cookbook';
import RecipeFullPage from './Pages/RecipeFullPage';

//Component imports
import NavBar from './Components/Structural/NavBar';

import CounterTop from './img/CounterTop.jpeg'

//API imports
import { getCookbook } from './Components/FoodStockHelpers/cookbookAPI'
import { getFoodStock } from './Components/FoodStockHelpers/pantryAPI'

function App() {
  const [pantry, setPantry] = useState([{
    _id: "123", totalStock: [{ _id: "ts" }],
    categories: [{ _id: "ct" }, { foodNames: ["fn"] }],
    fridge: [{ _id: "fr" }]
  }])
  const [cookbook, setCookbook] = useState<any>([]);

  useEffect(() => {
    getFoodStock(setPantry);
    getCookbook(setCookbook);
  }, []);





  return (
    <BrowserRouter>
      <NavBar />
      <div className=""
      // style={{ backgroundImage: `url(${CounterTop})`, backgroundSize: "cover" }}
      >
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/pantry" element={<Pantry pantry={pantry} setPantry={setPantry} />} />
          <Route path="/recipes" element={<Recipes pantry={pantry} setPantry={setPantry} />} />
          <Route path="/cookbook" element={<Cookbook cookbook={cookbook} setCookbook={setCookbook} />} />
          <Route path="/full-recipe/:recipeId" element={<RecipeFullPage pantry={pantry} setPantry={setPantry} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
