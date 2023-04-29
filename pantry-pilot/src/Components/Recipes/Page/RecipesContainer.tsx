import React, { useState, useEffect, useRef } from 'react'

// Component Imports
import NewRecipes from './NewRecipes'

type Props = {
    newRecipes: any,
    selectedIngredients: any,
}

export default function RecipesContainer({newRecipes, selectedIngredients}: Props) {
  return (
    <div>
        <NewRecipes newRecipes={newRecipes} selectedIngredients={selectedIngredients}/>
    </div>
  )
}