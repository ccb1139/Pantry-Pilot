import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

//Bootstrap imports
import Image from 'react-bootstrap/Image'

// Component Imports
import NutritionLabel from './NutritionLabel'
import RecipeSteps from './RecipeSteps'
import EquipmentContainer from './EquipmentContainer'
import Ingredients from './Ingredients'
import UserIngredients from './UserIngredients'
import RecipeTags from './RecipeTags'


//Icon Imports
import { AiOutlineFieldTime, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { IoPeopleOutline } from 'react-icons/io5'
import { BsCash, BsCashStack, BsBookmarkPlus, BsFillBookmarkStarFill } from 'react-icons/bs'
import { url } from 'inspector'

type Props = {
    recipeData: any,
    tagData: any,
    selectedIngredients: any,
}

function RecipeCard({ recipeData, tagData, selectedIngredients }: Props) {
    const [equipmentUsed, setEquipmentUsed] = useState<any>([])
    
    // const equipmentTileRef = useRef<any>(null)
    // console.log("recipeData", recipeData)

    useEffect(() => {
        let equipment: any = []

        const uniqueEquipment: any = {}; // or new Map();
        recipeData.analyzedInstructions[0].steps.forEach((step: any) => {
            step.equipment.forEach((item: any) => {
                if (uniqueEquipment[item.name]) {
                    return;
                }
                uniqueEquipment[item.name] = item;
                // or uniqueEquipment.set(item.name, item);
                equipment.push(item);
            });
        });
        setEquipmentUsed(equipment)
    }, [recipeData])




    const sectionDivider = (title: string) => (
        <div className='w-100 mt-3'>
            <h3 className='recipe-card-section-title'>{title}</h3>
            <hr />
        </div>
    )



    return (
        <div className='recipe-card'>
            {/* <div className='col-12'>
                <button className='btn btn-primary' onClick={() => { console.log(recipeData) }}>log data</button>
                <button className='btn btn-primary' onClick={() => {
                    console.log("missedIngredients", recipeData.missedIngredients);
                    console.log("usedIngredients", recipeData.usedIngredients);
                    console.log("unusedIngredients", recipeData.unusedIngredients);
                    console.log("extendedIngredients", recipeData.extendedIngredients);
                }}>log Ingredients Data</button>
            </div> */}
            <div className='col-12 d-flex recipe-card-header'
                style={{
                    background: `url(${recipeData.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className='recipe-card-header-2 '>
                    
                    <div className='col-7 recipe-card-header-mini'>
                        <h2 className='recipe-card-title text-end'>{recipeData.title}</h2>
                        <div className='recipe-card-quick-info'>By&nbsp;<a target="_blank" href={recipeData.spoonacularSourceUrl}> <span>{recipeData.sourceName}</span></a></div>

                    </div>
                    <div className='col-5 recipe-card-header-mini-right'>
                        <div className='col-12 recipe-card-basic-info'>
                            <div className='recipe-card-quick-info'>
                                <AiOutlineFieldTime size={20} className='me-1' />
                                <span>Ready in {recipeData.readyInMinutes} minutes</span>
                            </div>
                            <div className='recipe-card-quick-info'>
                                <IoPeopleOutline size={20} className='me-1' />
                                <span>Serves {recipeData.servings}</span>
                            </div>
                            {/* <div className='recipe-card-quick-info'>
                                <BsCash size={20} className='me-1' />
                                <span>Price Per Serving: ${(recipeData.pricePerServing / 100).toFixed(2)}</span>
                            </div> */}
                            <div className='recipe-card-quick-info'>
                                <BsCashStack size={20} className='me-1' />
                                <span>Price Per Recipe: ${((recipeData.servings) * (recipeData.pricePerServing / 100)).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className='recipie-card-body'>
                <div className='col-12 d-flex justify-content-evenly'>
                    <RecipeTags recipeData={recipeData} tagData={tagData} />
                </div>

                {sectionDivider('')}
                <div className='col-12 d-flex justify-content-evenly'>


                    <UserIngredients recipeData={recipeData} selectedIngredients={selectedIngredients} />



                </div>
                {sectionDivider('Ingredients')}
                <div className='col-12 d-flex flex-row'>
                    <div className='col-6'>
                        <Ingredients recipeData={recipeData} />

                    </div>
                    <div className='col-6 d-flex align-items-center justify-content-center'>
                        <EquipmentContainer equipmentUsed={equipmentUsed} />

                    </div>
                </div>
                {sectionDivider('Instructions')}
                <div className='col-12 d-flex flex-column'>

                    <RecipeSteps InstructionsData={recipeData.instructions} />


                </div>
                <div className='col-12 d-flex flex-column'>
                    <div className='m-auto'>
                        <NutritionLabel rd={recipeData} fullSize={true} />
                    </div>
                    

                </div>
            </div>
            <a href="https://www.flaticon.com/free-icons/gluten-free" title="gluten free icons">Icons created by Sudowoodo - Flaticon</a>
        </div>
    )
}

export default RecipeCard