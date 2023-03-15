import React from 'react'

function PantryHeader({pantry, setPantry}) {
  const today = new Date();
  return (
    <div className="col-12">
        <h2>My Fridge</h2>
        <p>Today's Date: {today.toISOString().substring(0, 10)}</p>
        <p>Number of Food Items: {pantry?.fridge.length} </p>
      </div>
  )
}

export default PantryHeader