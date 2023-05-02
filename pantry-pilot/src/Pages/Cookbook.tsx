import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';

// Components
import CookbookContainer from '../Components/CookBook/CookBookContainer';

// Types
import {Recipe} from '../Types/RecipeObject'

// css imports
import '../css/CookBook.css'
import '../css/Pantry.css'
import '../css/Recipe.css'

type Props = {}

function Cookbook({}: Props) {
  const [cookbook, setCookbook] = useState<any>([]);

  useEffect(() => {
    axios.get('http://localhost:4000/cookbook').then(({ data }) => {
      setCookbook(data);
      console.log(data);
      // console.log(data);
    })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  useEffect(() => {
    console.log(cookbook);
  }, [cookbook]);

  return (
    <div>
      <CookbookContainer cookbook={cookbook} />
    </div>
  )
}

export default Cookbook