import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

// Recipe Imports
import { dummyRecipieData1, dummyRecipeData2, dummyRecipeData2Info } from '../Components/Debug/DummyRecipeData'
import RecipesContainer from '../Components/Recipes/Page/RecipesContainer';

//css imports
import '../css/Recipe.css'

type Props = {}

function Recipes({}: Props) {
  const [fullRecipeData, setFullRecipeData] = useState<any>([])

  const location = useLocation()
  const selectedIngredients = location.state?.selectedIngredients || []

  const dummySelectedIngredients = [
    [],
    {
        "foodName": "Broccoli",
        "expirationDate": "2023-05-08T19:04:03.782Z",
        "category": "Vegetables",
        "emoji": "1f966",
        "_id": "6446d2bbe2982783f4abe8a7",
        "inSelectedIngredients": false
    },
    {
        "foodName": "Rice",
        "expirationDate": "2023-05-08T19:09:44.077Z",
        "category": "Grains",
        "emoji": "1f35e",
        "_id": "6446d403e2982783f4abeb09",
        "inSelectedIngredients": false
    },
    {
        "foodName": "Beef",
        "expirationDate": "2023-05-08T19:04:03.785Z",
        "category": "Protein",
        "emoji": "1f356",
        "_id": "6446d2bbe2982783f4abe8a6",
        "inSelectedIngredients": false
    }
]

  useEffect(() => { 
    // console.log("selectedIngredients", selectedIngredients)
    // console.log("dummyRecipieData", dummyRecipeData2)
    if(selectedIngredients.length > 0) {
      let query = ""; 
      selectedIngredientsToQuery(selectedIngredients).then((query_str) => {
        query = query_str;
        getRecipies(query)

        getRecipeIds(dummyRecipeData2).then((recipeIds) => {
          getRecipeInfo(recipeIds)
        })
      })
      
      // getRecipies(query)
      // for (let i = 0; i < dummyRecipeData2Info.length; i++) {
      //   console.log(dummyRecipeData2[i].id)
      //   console.log(dummyRecipeData2Info[i].id)
      // }

      
      // console.log("joinedData", joinedData)
    }
    let joinedData = dummyRecipeData2.map((recipe: any) => ({
      ...recipe,
      ...dummyRecipeData2Info.find((recipeInfo: any) => recipeInfo.id === recipe.id)
    }))
    setFullRecipeData(joinedData)
  }, [])

  async function selectedIngredientsToQuery(selectedIngredients: any) : Promise<string> {
    let query = (selectedIngredients[1].foodName).toLowerCase().trim() + ","
    for(let i = 2; i < selectedIngredients.length; i++) {
      query += "+" + (selectedIngredients[i].foodName).toLowerCase().trim() + ","
    }
    query = query.slice(0, -1)
    query += "&number=10"
    console.log("selectedIngredients", selectedIngredients)
    return query
  }

  function getRecipies(IngredientsQuery: string) {
    // console.log("https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + (process.env.REACT_APP_API_KEY)?.trim() + "&ingredients=" + IngredientsQuery)
    // console.log("https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2")
    // axios.get("https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + (process.env.REACT_APP_API_KEY)?.trim() + "&ingredients=" + IngredientsQuery).then(response => {
    //   console.log(response.data);

    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }

  async function getRecipeIds(recipes: any) : Promise<string> {
    let recipeIds = "";
    for(let i = 0; i < recipes.length; i++) {
      recipeIds += recipes[i].id + ","
    }
    recipeIds = recipeIds.slice(0, -1)
    return recipeIds;
  }

  function getRecipeInfo(recipeIds: string) {
    // console.log("https://api.spoonacular.com/recipes/informationBulk?apiKey=" + (process.env.REACT_APP_API_KEY)?.trim() + "&ids=" + recipeIds + "&inc " )
    // axios.get("https://api.spoonacular.com/recipes/informationBulk?apiKey=" + (process.env.REACT_APP_API_KEY)?.trim() + "&ids=" + recipeIds + "&includeNutrition=true").then(response => {
    //   console.log(response.data);
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }



  return (
    <div className='app-font'>
      <RecipesContainer newRecipes={fullRecipeData} selectedIngredients={dummySelectedIngredients}/>
    </div>
  )
}

export default Recipes