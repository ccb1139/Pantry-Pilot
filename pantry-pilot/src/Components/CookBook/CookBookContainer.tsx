import React from 'react'

// Component Imports
import CookBookTile from './CookBookTile'

import {Recipe} from '../../Types/RecipeObject'


type Props = {
    cookbook: Recipe[],
}

function CookBookContainer({cookbook}: Props) {
  return (
    <div className='border container cookbook-container'>
        {cookbook.map((recipe: any) => (
            <CookBookTile recipe={recipe} />
        ))}
    </div>
  )
}

export default CookBookContainer