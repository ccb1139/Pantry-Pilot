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
import { AiOutlineFieldTime, AiOutlineShoppingCart, AiOutlineInfoCircle } from 'react-icons/ai'
import { IoPeopleOutline } from 'react-icons/io5'
import { BsCash, BsCashStack, BsBookmarkPlus, BsFillBookmarkStarFill } from 'react-icons/bs'

// Bootstrap imports
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';

type Props = {
    recipe: RecipeTypes.Recipe,
    recipeTags: any,
}

function CookBookTile({ recipe, recipeTags }: Props) {
    // console.log("recipe", recipe)
    // const [recipeTags, setRecipeTags] = useState<any>(getRecipeTags(recipe))
    const { id } = recipe





    return (
        <div className='cookbook-tile col-3'>
            <Link className='cookbook-tile-top' to={"/full-recipe/:" + id} state={{ recipe: recipe, tags: recipeTags }}>
                <div className='cookbook-tile-tags'>
                    <CookBookTileTags tags={recipeTags} missedIngredientCount={recipe.missedIngredientCount} recipe={recipe} />
                </div>
                <div className='cookbook-tile-img-cont'>
                    <Image src={recipe.image} fluid className='cookbook-tile-img' />
                </div>
                <div className='col-12 d-flex'>
                    <div className='cookbook-tile-name col-12' >
                        <div className='col-12 title' title={recipe.title}>{recipe.title}</div>
                        <div className='source'>By {recipe.sourceName}</div>
                    </div>
                    <div className='col-1 d-flex align-items-center justify-content-center'>
                        {/* <AiOutlineInfoCircle size={20} /> */}
                    </div>
                </div>

            </Link>
            <div className='cookbook-tile-bottom'>

                <div className='cookbook-tile-basic-info'>
                    <OverlayTrigger
                        placement='bottom'
                        delay={{ show: 150, hide: 100 }}
                        overlay={<Tooltip id="button-tooltip" >Ready in {recipe.readyInMinutes} minutes</Tooltip>}
                    >
                        <div className='cookbook-basic-info-item'> <AiOutlineFieldTime size={20} className='me-1' /> {recipe.readyInMinutes}min</div>
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
                        overlay={<Tooltip id="button-tooltip" >Price Per Serving: ${((recipe.pricePerServing / 100)).toFixed(2)}</Tooltip>}
                    >
                        <div className='cookbook-basic-info-item'><BsCashStack size={20} className='me-1' /> ${((recipe.pricePerServing / 100)).toFixed(2)}</div>

                    </OverlayTrigger>

                </div>
            </div>


        </div>
    )
}

export default CookBookTile