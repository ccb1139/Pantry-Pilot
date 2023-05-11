import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react'

import SaveButton from './SaveButton'



//Bootstrap Imports
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//Icon Imports
import { BiMoney, BiRecycle } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import gluten_free from '../../../img/DietIcons/gluten-free.png'
import dairy_free from '../../../img/DietIcons/dairy-free.png'
import _vegetarian from '../../../img/DietIcons/meat-free.png'
import _vegan from '../../../img/DietIcons/leaf.png'
import _pescetarian from '../../../img/DietIcons/fish.png'


type Props = {
    recipeData: any,
    tagData: any,
    inCookbook: boolean,
}

function RecipeTags({ recipeData, tagData, inCookbook }: Props) {
    const iconSize = "30px"
    const [saved, setSaved] = useState<boolean>(false)

    useEffect(() => {
        setSaved(inCookbook)
    }, [inCookbook])



    const dietIcons: any = {
        "gluten free": gluten_free,
        "dairy free": dairy_free,
        "vegetarian": _vegetarian,
        "vegan": _vegan,
    }
    const tagIcons: any = {
        "cheap": (<BiMoney size={iconSize} />),
        "sustainable": (<BiRecycle size={iconSize} />),
        "very healthy": (<AiOutlineHeart size={iconSize} />),
    }


    const tagIcon = (diet: any) => {
        // console.log(diet)
        // console.log(tagIcons)

        if (diet in dietIcons) {
            return (<Image fluid src={dietIcons[diet]} />)
        } else if (diet in tagIcons) {
            return (tagIcons[diet])
        }

    }

    return (
        <div className='recipie-tag-container'>
            <div className='flex-help col-2'>
                {tagData?.dietTags?.map((diet: any, index: number) => (
                    <OverlayTrigger
                        placement='top'
                        delay={{ show: 150, hide: 100 }}
                        overlay={<Tooltip id="button-tooltip" >{diet}</Tooltip>}
                    >
                        <div className='recipe-card-diet-icon mx-1' style={{ height: iconSize, width: iconSize }}>
                            {tagIcon(diet)}
                        </div>
                    </OverlayTrigger>
                ))}
            </div>
            <div className='col-8 flex-help justify-content-center'>
                <div className='flex-help'>
                    <span className='mx-2'>Cal: {tagData?.nutritionInfo.calories}</span>
                    <span className='mx-2'>Fat: {tagData?.nutritionInfo.fat}g</span>
                    <span className='mx-2'>Carbs: {tagData?.nutritionInfo.carbs}g</span>
                    <span className='mx-2'>Protein: {tagData?.nutritionInfo.protein}g</span>
                </div>
            </div>
            <div className='d-flex col-2 flex-help justify-content-end'>
                <div className=' '>
                    <SaveButton saved={saved} setSaved={setSaved} recipeData={recipeData} />
                </div>
            </div>


        </div>
    )
}

export default RecipeTags