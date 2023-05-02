import React from 'react'
import { useLocation, useNavigate  } from "react-router-dom";

//Css Imports
import '../css/Recipe.css'
import '../css/RecipeFullPage.css'

//Component Imports
import RecipeCard from '../Components/Recipes/Page/RecipeCard'
import RecipeUtility from '../Components/Recipes/Page/RecipeUtility'

type Props = {}

function RecipeFullPage({ }: Props) {
    const location = useLocation();
    let navigate  = useNavigate();

    // console.log(props, " props");
    console.log(location, " useLocation Hook");
    const recipe = location.state?.recipe;
    const tags = location.state?.tags;
    console.log(recipe, " recipe");
    
    
    return (
        <div className='recipe-full-page-container container'>
            <div className='col-3'>
                <button onClick={() => {navigate(-1);}}>Back</button>
                <RecipeUtility visable={true}/>
            </div>
            <div className='col-9'>

                <RecipeCard recipeData={recipe} tagData={tags} selectedIngredients={[]} />
            </div>
            
        </div>
    )
}

export default RecipeFullPage