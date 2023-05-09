import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react'

// Component Imports
import RecipeFoodTile from './RecipeFoodTile'
import RecipiePotTile from '../Preview/RecipePotTile'

//Helper function
import { findUsedIng } from './UserIngredientsTS/FindUsedIng'
import { getCategoryEmojiByName } from '../../../Components/FoodStockHelpers/pantryAPI'

// Object imports
import { aisleEmojis } from './SpoonacularAisleEmojis'

type Props = {
    recipeData: any,
    selectedIngredients: any,
    pantry: any,
}
// NEED TO FIX THIS LOGIC

function UserIngredients({ recipeData, selectedIngredients, pantry }: Props) {
    const { usedIngredientsList, unusedIngredientsList, missedIngredientsList } = recipeData

    // const [usedIngredientsList, setUsedIngredientsList] = useState<any[]>();
    // const [unusedIngredientsList, setUnusedIngredientsList] = useState<any[]>();
    // const [missedIngredientsList, setMissedIngredientsList] = useState<any[]>();


    // console.log(pantry)

    // useEffect(() => {
    //     // console.log(pantry[0].categories.length)
    //     // console.log(pantry)

    //     const {usedIngredients, unusedIngredients, missingIngredients} = findUsedIng(recipeData, selectedIngredients, pantry);
    //     // console.log('usedIngredients', usedIngredients)
    //     setUsedIngredientsList(usedIngredients);
    //     setUnusedIngredientsList(unusedIngredients);
    //     setMissedIngredientsList(missingIngredients);
    //     // debugger;
        
    // }, [pantry])

    const label = (name: string) => (
        <h5 className=' label text-center'>{name}</h5>
    )


    return (
        <div className='col-12 d-flex flex-row'>
            {/* <button onClick={() => { console.log(recipeData.extendedIngredients, selectedIngredients, pantry[0]["totalStock"]) }}>Log Data</button> */}
            <div className='col-7 need-to-get user-ingredients-cont '>
                {label('Need to get')}
                <div className='tile-ingredients  '>
                    {missedIngredientsList?.map((ingredient: any, index: number) => {
                        const { name, aisle } = ingredient;
                        const nameTrimmed = name.trim();
                        const aisleParsed = aisle.split(';');
                        const aisleTrimmed = aisleParsed[aisleParsed.length - 1].trim();
                        // console.log(nameTrimmed, aisleTrimmed, aisleEmojis[aisleTrimmed])
                        return (
                            <div className='' key={index}>
                                <RecipeFoodTile
                                    foodName={nameTrimmed}
                                    category={aisleTrimmed}
                                    expirationDate={"-1"}
                                    emoji={aisleEmojis[aisleTrimmed]}
                                    _id={ingredient._id}
                                />
                            </div>
                        )
                    })
                    }
                </div>

            </div>
            <div className='col-5'>
                <div className='will-use user-ingredients-cont' >
                    {label('Will be using')}
                    {/* <button onClick={() => { console.log(usedIngredientsList) }}>Log Data</button> */}
                    <div className='tile-ingredients '>
                        {usedIngredientsList?.map((ingredient: any, index: number) => {
                            // if(unusedIngredientsList.length === 0){
                            //     return
                            // }
                            if(recipeData.title === 'Beefy Coconutty Curry'){
                                // console.log(ingredient.category)
                                // console.log(ingredient.emoji, '<<>>', getCategoryEmojiByName(ingredient.category, pantry, ()=>{}))
                                // console.log(unusedIngredientsList.length)
                                
                                // debugger;

                            }
                            
                            const emoji = ingredient.emoji ?? getCategoryEmojiByName(ingredient.category, pantry, ()=>{});
                            return (
                                <div className='' key={index}>
                                    <RecipeFoodTile
                                        foodName={ingredient.foodName}
                                        category={ingredient.category}
                                        expirationDate={ingredient.expDate}
                                        emoji={emoji}
                                        _id={ingredient._id}
                                    />
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                {unusedIngredientsList?.length > 0 &&
                    <div className='wont-use user-ingredients-cont'>
                        {label('Wont be using')}
                        <div className='tile-ingredients'>
                            {unusedIngredientsList?.map((ingredient: any, index: number) => {
                                return (
                                    <div className='' key={index}>
                                        <RecipeFoodTile
                                            foodName={ingredient.foodName}
                                            category={ingredient.category}
                                            expirationDate={ingredient.expDate}
                                            emoji={ingredient.emoji}
                                            _id={ingredient._id}
                                        />
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                }
            </div>



        </div>
    )
}

export default UserIngredients