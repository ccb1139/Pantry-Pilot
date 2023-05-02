import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

// Cookbook api imports
import {updateRecipe, addRecipe} from '../../FoodStockHelpers/cookbookAPI'

// Icon Imports
import { BsBookmarkFill, BsBookmarkPlus, BsFillBookmarkStarFill } from 'react-icons/bs'
import {AiFillBook} from 'react-icons/ai'

type Props = {
    recipeData: any,
    saved: boolean,
    setSaved: any,
}

function SaveButton({ recipeData, saved, setSaved }: Props) {
    const [saveClass, setSaveClass] = useState<string>('invisible')

    function saveRecipe() {
        setSaved(!saved)
        if (!saved) {
            setSaveClass('saved-animation')
            console.log(recipeData)
            addRecipe(recipeData)
        } else {
            setSaveClass('invisible')
        }
    }


    return (
        <div className={'save-btn d-flex '} onClick={() => saveRecipe()}>
            <div className={'me-1 '}>
                {saved ? (
                    <span>Saved!</span>
                ) : (
                    <span>Save</span>
                )}
            </div>
            <div className='icon-cont'>
                {saved ? (
                    <BsFillBookmarkStarFill size="20px" />
                ) : (
                    <BsBookmarkPlus size="20px" />
                )}
                <BsBookmarkFill size="20px" className={'book-anim ' + saveClass} />
            </div>
            
        </div>
    )
}

export default SaveButton