import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'

// Function Imports
import { getRecipeTags } from '../Structural/RecipeHelpers'

// Components
import CookBookTileTags from './CookBookTileTags';

// type imports
import * as RecipeTypes from '../../Types/RecipeObject';

//Icon Imports
import { IconContext } from "react-icons";
import { AiOutlineFieldTime, AiOutlineShoppingCart } from 'react-icons/ai'
import { IoPeopleOutline } from 'react-icons/io5'
import { BsCash, BsCashStack, BsBookmarkPlus, BsFillBookmarkStarFill } from 'react-icons/bs'

// Bootstrap imports
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

type Props = {
    recipe: RecipeTypes.Recipe,
}

function CookBookTile({ recipe }: Props) {
    const [recipeTags, setRecipeTags] = useState<any>(getRecipeTags(recipe))
    const { id } = recipe


    const iconColor = () => {
        if (recipe.missedIngredientCount > 7) {
            return "red"
        } else if (recipe.missedIngredientCount > 3) {
            return "#fcba03"
        } else {
            return "green"
        }
    }


    return (
        <div className='cookbook-tile'>
            <Link className='cookbook-tile-top' to={"/full-recipe/:" + id} state={{recipe: recipe, tags: recipeTags}}>
                <div className='cookbook-tile-tags'>
                    <CookBookTileTags tags={recipeTags} />
                </div>
                <div className='cookbook-tile-img-cont'>
                    <Image src={recipe.image} fluid className='cookbook-tile-img' />
                </div>
                <div className='cookbook-tile-name' >
                    <div className='col-12 title'>{recipe.title}</div>
                    <div className='source'>By {recipe.sourceName}</div>
                </div>
            </Link>
            <div className='cookbook-tile-bottom'>

                <div className='cookbook-tile-basic-info'>
                    <OverlayTrigger
                        placement='bottom'
                        delay={{ show: 150, hide: 100 }}
                        overlay={<Tooltip id="button-tooltip" >Ready in {recipe.readyInMinutes} minutes</Tooltip>}
                    >
                        <div className='cookbook-basic-info-item'> <AiOutlineFieldTime size={20} className='me-1' /> {recipe.readyInMinutes}</div>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement='bottom'
                        delay={{ show: 150, hide: 100 }}
                        overlay={<Tooltip id="button-tooltip" >Serves {recipe.servings}</Tooltip>}
                    >
                        <div className='cookbook-basic-info-item'><IoPeopleOutline size={20} className='me-1' /> {recipe.servings}</div>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement='bottom'
                        delay={{ show: 150, hide: 100 }}
                        overlay={<Tooltip id="button-tooltip" >Price Per Recipe: ${((recipe.servings) * (recipe.pricePerServing / 100)).toFixed(2)}</Tooltip>}
                    >
                        <div className='cookbook-basic-info-item'><BsCashStack size={20} className='me-1' /> {((recipe.servings) * (recipe.pricePerServing / 100)).toFixed(2)}</div>

                    </OverlayTrigger>
                    <OverlayTrigger
                        placement='bottom'
                        delay={{ show: 150, hide: 100 }}
                        overlay={<Tooltip id="button-tooltip" >{recipe.missedIngredientCount} foods not in your pantry</Tooltip>}
                    >
                        <div className='cookbook-basic-info-item ms-auto'>
                            <IconContext.Provider value={{ color: iconColor() }}>
                                <AiOutlineShoppingCart size={20} className='me-1' />
                            </IconContext.Provider>
                            {recipe.missedIngredientCount}
                        </div>
                    </OverlayTrigger>
                </div>
            </div>


        </div>
    )
}

export default CookBookTile