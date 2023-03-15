import React from 'react'
import PantryTile from './PantryTile'

function PantryBody({pantry, setPantry}) {
  return (
    <div className='d-flex justify-content-center '>
      {pantry[0].fridge.map((food) => {
        return (
          <PantryTile
            category={food.category}
            foodName={food.foodName}
            expirationDate={food.expirationDate}
            _id={food._id}
            key={food._id}
          />
        )
      })
      }

    </div>
  )
}

export default PantryBody