import React, { useState, useEffect, useRef } from 'react'

// Component Imports
import NewRecipes from './NewRecipes'

type Props = {
    newRecipes: any,
    selectedIngredients: any,
    cookbook: any,
    pantry: any,
}

export default function RecipesContainer({newRecipes, selectedIngredients, cookbook, pantry}: Props) {
  return (
    <div>
        <NewRecipes newRecipes={newRecipes} selectedIngredients={selectedIngredients} cookbook={cookbook} pantry={pantry}/>
    </div>
  )
}