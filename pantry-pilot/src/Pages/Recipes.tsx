import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

// API imports
import { getCookbook, clearAndFillLastSearches, getLastSearch } from '../Components/FoodStockHelpers/cookbookAPI'
import { findUsedIng } from '../Components/Recipes/Page/UserIngredientsTS/FindUsedIng'
import { getCategoryEmojiByName } from '../Components/FoodStockHelpers/pantryAPI'

// Recipe Imports
import { dummyRecipieData1, dummyRecipeData2, dummyRecipeData2Info, testingDummyData } from '../Components/Debug/DummyRecipeData'
import RecipesContainer from '../Components/Recipes/Page/RecipesContainer';

//css imports
import '../css/Recipe.css'

type Props = {
  pantry: any,
  setPantry: any,
}

function Recipes({ pantry, setPantry }: Props) {
  const [fullRecipeData, setFullRecipeData] = useState<any>([])
  const [cookBook, setCookbook] = useState<any>([]);
  const [recipeData, setRecipeData] = useState<any>([]);
  const [recipeInfo, setRecipeInfo] = useState<any>([]);

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

    getCookbook(setCookbook);
    if (selectedIngredients.length > 0) {
      getandCompileRecipeData();
    } else {
      // Get last recipe search from server
      getLastSearch(setFullRecipeData)
    }
  }, [])

  async function getandCompileRecipeData() {
    try {
      const query_str = await selectedIngredientsToQuery(selectedIngredients);
      console.log("query_str", query_str)
      let recipeData = await getRecipes(query_str);
      console.log(recipeData)
      const recipeIds = await getRecipeIds(recipeData);
      console.log("recipeIds", recipeIds)
      let recipeInfo = await getRecipeInfo(recipeIds);

      let joinedData = await joinDataById(recipeData, recipeInfo);

      console.log("joinedData", joinedData)
      let fullRecipeData = await addUsedIngredientsToJoinedData(joinedData, selectedIngredients, pantry);
      console.log("fullRecipeData", fullRecipeData)
      setFullRecipeData(fullRecipeData)
      clearAndFillLastSearches(fullRecipeData)
    } catch (err) {
      console.error(err);
    }

  }

  async function addUsedIngredientsToJoinedData(_joinedData: any, selectedIngredients: any, pantry: any) {
    let joinedData = [..._joinedData]
    for (let i = 0; i < joinedData.length; i++) {
      try {
        const {usedIngredients, unusedIngredients, missingIngredients} = await findUsedIng(joinedData[i], selectedIngredients, pantry);
        joinedData[i].usedIngredientsList = usedIngredients;
        joinedData[i].unusedIngredientsList = unusedIngredients;
        joinedData[i].missedIngredientsList = missingIngredients;

      } catch (err) {
        console.error(err);
      }
    }
    return joinedData;
  }

  async function joinDataById(recipeData: any, recipeInfo: any) {
    let joinedData = recipeData.map((recipe: any) => ({
      ...recipe,
      ...recipeInfo.find((recipeInfo: any) => recipeInfo.id === recipe.id)
    }))
    return joinedData;
  }



  useEffect(() => {
    console.log(cookBook)
  }, [cookBook])


  async function selectedIngredientsToQuery(selectedIngredients: any): Promise<string> {
    let query = (selectedIngredients[1].foodName).toLowerCase().trim() + ","
    for (let i = 2; i < selectedIngredients.length; i++) {
      query += "+" + (selectedIngredients[i].foodName).toLowerCase().trim() + ","
    }
    query = query.slice(0, -1)
    query += "&number=10"
    console.log("selectedIngredients", selectedIngredients)
    return query
  }

  async function getRecipes(IngredientsQuery: string) {
    try {
      const response = await axios.get("https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + (process.env.REACT_APP_API_KEY)?.trim() + "&ingredients=" + IngredientsQuery);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }

  }

  async function getRecipeIds(recipes: any): Promise<string> {
    let recipeIds = "";
    for (let i = 0; i < recipes.length; i++) {
      recipeIds += recipes[i].id + ","
    }
    recipeIds = recipeIds.slice(0, -1)
    return recipeIds;
  }

  async function getRecipeInfo(recipeIds: string) {
    console.log("https://api.spoonacular.com/recipes/informationBulk?apiKey=" + (process.env.REACT_APP_API_KEY)?.trim() + "&ids=" + recipeIds + "&inc ")
    try {
      const response = await axios.get("https://api.spoonacular.com/recipes/informationBulk?apiKey=" + (process.env.REACT_APP_API_KEY)?.trim() + "&ids=" + recipeIds + "&includeNutrition=true");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='app-font'>
      <RecipesContainer newRecipes={fullRecipeData} selectedIngredients={selectedIngredients} cookbook={cookBook} pantry={pantry} />
    </div>
  )
}

export default Recipes