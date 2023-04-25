import React, { useState, useEffect, useRef } from 'react'

//Bootstrap imports
import Image from 'react-bootstrap/Image'

// Component Imports
import NutritionLabel from './NutritionLabel'

type Props = {
    recipeData: any,
}

function RecipeCard({ recipeData }: Props) {
    // console.log("recipeData", recipeData)


    {
        <>

            <Image src={recipeData.image} rounded thumbnail fluid />

            <div className='d-flex'>
                <NutritionLabel rd={recipeData} fullSize={false} />
            </div>

            <div className='recipe-card-basic-info'>
                <div>Ready in {recipeData.readyInMinutes} minutes</div>
            </div>

            <h6>Missing Ingredients</h6>
            <ul>
                {recipeData.missedIngredients?.map((ingredient: any) => {
                    return (
                        <li>{ingredient.name}</li>
                    )
                })}
            </ul>

            <h6>
                Unused Ingredients
            </h6>
            <ul>
                {recipeData.unusedIngredients?.map((ingredient: any) => {
                    return (
                        <li>{ingredient.name}</li>
                    )
                })}
            </ul>
        </>
    }





    return (
        <div className='recipe-card'>
            <div className='row'>
                <h3 className='recipe-card-title row'>{recipeData.title}</h3>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <Image src={recipeData.image} rounded thumbnail fluid />
                </div>

            </div>


        </div>
    )
}

export default RecipeCard