import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';

// Components
import CookbookContainer from '../Components/CookBook/CookBookContainer';

import { getCookbook } from '../Components/FoodStockHelpers/cookbookAPI'


// Types
import { Recipe } from '../Types/RecipeObject'

// css imports
import '../css/CookBook.css'
import '../css/Pantry.css'
import '../css/Recipe.css'

type Props = {
  cookbook: Recipe[],
  setCookbook: any,
}

function Cookbook({cookbook, setCookbook}: Props) {
  
  useEffect(() => {
    getCookbook(setCookbook);
  }, []);


  // getRecipe(cookbook[0]?._id).then((recipe: any) => {
  //   console.log(recipe);
  // });


  return (
    <div className='container'>
      <CookbookContainer cookbook={cookbook} />
    </div>
  )
}

export default Cookbook