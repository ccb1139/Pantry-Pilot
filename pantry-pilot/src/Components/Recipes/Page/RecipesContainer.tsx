import React, { useState, useEffect, useRef } from 'react'

// Component Imports
import NewRecipes from './NewRecipes'

type Props = {
    newRecipes: any,
}

export default function RecipesContainer({newRecipes}: Props) {
  return (
    <div>
        <NewRecipes newRecipes={newRecipes}/>
    </div>
  )
}