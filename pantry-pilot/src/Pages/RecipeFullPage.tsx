import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";

//Css Imports
import '../css/Recipe.css'
import '../css/RecipeFullPage.css'

//Component Imports
import RecipeCard from '../Components/Recipes/Page/RecipeCard'
import RecipeUtility from '../Components/Recipes/Page/RecipeUtility'
import PageBackButton from '../Components/Structural/PageBackButton';

type Props = {
    pantry: any,
    setPantry: any,
}

function RecipeFullPage({ pantry, setPantry }: Props) {
    const location = useLocation();


    // console.log(props, " props");
    console.log(location, " useLocation Hook");
    const recipe = location.state?.recipe;
    const tags = location.state?.tags;
    console.log(recipe, " recipe");


    return (
        <div className='d-flex position-relative '>
            <PageBackButton show={true} path='/cookbook' />
            <div className='recipe-full-page-container container'>

                <div className='col-3'>
                
                    <RecipeUtility visable={true} />
                </div>
                <div className='col-9'>

                    <RecipeCard recipeData={recipe} tagData={tags} selectedIngredients={[]} inCookbook={true} pantry={pantry} />
                </div>

            </div>
        </div>
    )
}

export default RecipeFullPage