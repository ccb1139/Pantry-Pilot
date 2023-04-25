import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";

// Components Imports
import RecipePreviewModal from './RecipePreviewModal'

// Draggable Imports
import { useDrop } from 'react-dnd'
import { useDrag } from 'react-dnd'

import { eventEmitter } from '../../Structural/Emitter';

//Pantry Imports
import PantryTile from '../../Pantry/PantryTile'

// Recipe Pot Imports
import RecipePotTile from './RecipePotTile';

// Icon Imports
import { IconContext } from "react-icons";
import { AiOutlineArrowRight } from 'react-icons/ai'

//Api Imports
import {
  getCategoryEmojiByName,
  getCategories,
} from '../../FoodStockHelpers/pantryAPI';

// CSS Imports
import '../../../css/RecipePot.css'

type Props = {
  pantry: any,
  selectedIngredients: any,
  setSelectedIngredients: React.Dispatch<React.SetStateAction<any>>,
  setNewAddedFoodForComponent: React.Dispatch<React.SetStateAction<any>>,

}

function RecipePot({ pantry, selectedIngredients, setSelectedIngredients, setNewAddedFoodForComponent }: Props) {
  const [newAddedFood, setNewAddedFood] = useState<any>([])
  const canQueryRecipes = selectedIngredients.length === 1 ? false : true;
  const [hasAddedFood, setHasAddedFood] = useState<boolean>(false);

  const [showRecepiePreviewModal, setShowRecepiePreviewModal] = useState<boolean>(false)

  // const [canQueryRecipes, setCanQueryRecipes] = useState<boolean>(false)
  
  // When a food is dropped into the recipe pot, add it to the selected ingredients array
  useEffect(() => {
    for (let i = 0; i < selectedIngredients?.length; i++) {
      if (selectedIngredients[i]?._id === newAddedFood?._id) {
        return
      }
    }
    let newSelectedIngredients = [...selectedIngredients]
    newSelectedIngredients.push(newAddedFood)
    setSelectedIngredients(newSelectedIngredients)
    setNewAddedFoodForComponent(newAddedFood)
    setNewAddedFood([])
  }, [newAddedFood])

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'BOX',
    // Props to collect
    drop: (item, monitor) => {
      setNewAddedFood(monitor.getItem())
      setHasAddedFood(true)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      test: monitor.getItem()
    })
  }))

  const isActive = canDrop && isOver
  const dropStyleClass = canDrop ? (isOver ? 'over-active-dropzone' : 'active-dropzone') : ''


  return (
    <div ref={drop} role={'Dustbin'} style={{ height: "100%" }} className={'recipe-pot-container '}>
      <div className='d-flex flex-column align-items-center recipe-pot' style={{ height: "100%" }}>
        <div className={'recipe-pot-header text-center '} >
          <div className={'recipe-pot-btn' + ((hasAddedFood) ? ( canQueryRecipes ? '-active' : '-inactive'): '-inactive')} >
          <Link to='/recipes'
          state={{ selectedIngredients: selectedIngredients }}
          className={'no-link-style recipe-pot-btn' + ((hasAddedFood) ? ( canQueryRecipes ? '-active' : '-inactive'): '-inactive')}
          >
            Get Recipes
            { !canQueryRecipes ?  null : <AiOutlineArrowRight />}
            </Link>
          </div>

        </div>


        <div className={'recipe-pot-body ' + dropStyleClass + (selectedIngredients.length === 1 ? ' no-items ' : ' items ')}>
          {selectedIngredients?.map((ingredient: any, index: number) => {
            if (ingredient._id === undefined && selectedIngredients.length === 1) {
              return (
                <div className='recipe-pot-subheader text-center'>
                  Drag ingredients here to get recipes
                </div>
              )
            } else if (ingredient._id === undefined) {
              return
            }
            return (
              <RecipePotTile
                category={ingredient.category}
                foodName={ingredient.foodName}
                expirationDate={ingredient.expirationDate}
                emoji={getCategoryEmojiByName(ingredient.category, pantry)}
                _id={ingredient._id}
                handleTileClick={ingredient.handleTileClick}
                inSelectedIngredients={true}
                key={index}
              />
            )
          })

          }
        </div>
      </div>
      <RecipePreviewModal selectedIngredients={selectedIngredients} show={showRecepiePreviewModal} setShow={setShowRecepiePreviewModal} />

    </div>
  )
}

export default RecipePot