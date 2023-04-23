import React, { useState, useEffect, useRef } from 'react'

//Bootstrap Imports
import { Modal } from 'react-responsive-modal';

type Props = {
  selectedIngredients: any,
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
}

function RecipePreviewModal({ selectedIngredients, show, setShow }: Props) {
  useEffect(() => {
    console.log("selectedIngredients", selectedIngredients)
  }, [selectedIngredients])

  return (
    <Modal open={show} onClose={() => setShow(false)} center>
      <h2>Recipe Preview</h2>
      {selectedIngredients.map((ingredient: any) => {
        return (
          <div>
            <p>{ingredient.foodName}</p>
          </div>
        )
      })
      }
    </Modal>
  )
}

export default RecipePreviewModal