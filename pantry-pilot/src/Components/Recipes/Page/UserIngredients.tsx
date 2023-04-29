import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

// Component Imports
import RecipeFoodTile from './RecipeFoodTile'
import RecipiePotTile from '../Preview/RecipePotTile'


// Object imports
import { aisleEmojis } from './SpoonacularAisleEmojis'

type Props = {
    recipeData: any,
    selectedIngredients: any,
}
// NEED TO FIX THIS LOGIC

function UserIngredients({ recipeData, selectedIngredients }: Props) {
    const { usedIngredients, missedIngredients, unusedIngredients } = recipeData
    const [usedIngredientsList, setUsedIngredientsList] = useState<any[]>([]);
    const [unusedIngredientsList, setUnusedIngredientsList] = useState<any[]>([]);
    const [missedIngredientsList, setMissedIngredientsList] = useState<any[]>([]);

    useEffect(() => {
        // console.log('selectedIngredients', selectedIngredients)
        // console.log('usedIngredients', usedIngredients)
        // selectedIngredients.shift();
        let used: any = [];
        let unused: any = [];
        for (let j = 1; j < selectedIngredients.length; j++) {
            const { foodName } = selectedIngredients[j];
            const foodNameLower = foodName.toLowerCase().trim();
            for (let i = 0; i < usedIngredients.length; i++) {

                const { name, original, originalName } = usedIngredients[i];


                // Check if in usedIngredients
                if (name.includes(foodNameLower) || original.includes(foodNameLower) || originalName.includes(foodNameLower)) {

                    // console.log('match', foodName, usedIngredients[i]);
                    // console.log('match2', selectedIngredients[j])
                    used.push({
                        foodName: foodName,
                        category: selectedIngredients[j].category,
                        expDate: selectedIngredients[j].expirationDate,
                        ind: j,
                        inSelectedIngredients: false,
                        _id: selectedIngredients[j]._id,
                        emoji: selectedIngredients[j].emoji,
                    })
                }
            }
            for (let i = 0; i < unusedIngredients.length; i++) {
                const { name, original, originalName } = unusedIngredients[i];
                // Check if in unusedIngredients
                // console.log(name, "selected:", foodNameLower)
                if (name.includes(foodNameLower) || original.includes(foodNameLower) || originalName.includes(foodNameLower)) {

                    // console.log('match', foodName, usedIngredients[i]);
                    // console.log('match2', selectedIngredients[j])
                    unused.push({
                        foodName: foodName,
                        category: selectedIngredients[j].category,
                        expDate: selectedIngredients[j].expirationDate,
                        ind: j,
                        inSelectedIngredients: false,
                        _id: selectedIngredients[j]._id,
                        emoji: selectedIngredients[j].emoji,
                    })
                }
            }
        }


        // console.log(recipeData.title)
        // console.log('used', used)
        setUsedIngredientsList(used)
        setUnusedIngredientsList(unused)
    }, [selectedIngredients])

    const label = (name: string) => (
        <h5 className=' label text-center'>{name}</h5>
    )


    return (
        <div className='col-12 d-flex flex-row'>
            <div className='col-7 need-to-get user-ingredients-cont '>
                {label('Need to get')}
                <div className='tile-ingredients  '>
                    {missedIngredients.map((ingredient: any, index: number) => {
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
                <div className='will-use user-ingredients-cont'>  
                    {label('Will be using')}
                    <div className='tile-ingredients '>
                        {usedIngredientsList.map((ingredient: any, index: number) => {
                            // console.log(ingredient)
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
            { unusedIngredientsList.length > 0 &&
                <div className='wont-use user-ingredients-cont'>
                    {label('Wont be using')}
                    <div className='tile-ingredients'>
                        {unusedIngredientsList.map((ingredient: any, index: number) => {
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