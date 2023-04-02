import React, { useState, useEffect, useRef, forwardRef } from 'react'

//Grocery Bag Imports
import GroceryBagTile from './GroceryBagTile'

function GroceryBagSearchResults({ SearchArray, search, selected, setSelected }) {
  const [_SearchArray, _setSearchArray] = useState([]);
  
  useEffect(() => {
    let tmpArr = []
    for(let foodItm of SearchArray){
      if(foodItm.showInSearch === true){
        tmpArr.push(foodItm);
      }
    }
    _setSearchArray(tmpArr)
  }, [SearchArray])

  // Functions handles a tile click, based off a type
  function handleTileClick(foodName, categoryName, expirationDate, ind, type) {
    // To add a food to the selected array
    if (type === "add") {
      setSelected([...selected, { foodName: foodName, categoryName: categoryName, expirationDate: expirationDate }])
      // console.log(foodName, categoryName, expirationDate, ind, type)
    }
    // To remove a food from a category! not the selected array.
  }

  



  return (
    <div className='col-12 d-flex flex-wrap'>
      {_SearchArray?.map((item, index) => {
        return (
          <GroceryBagTile
            foodName={item.foodName}
            categoryName={item.categoryName}
            // selected={item.selected}
            // handleClickFunc={item.handleClickFunc}
            // inSelected={item.inSelected}
            handleClickFunc={handleTileClick}
            expDate={item.expirationDate}
            ind={index}
            canEditFoods={false}
          />
        )
      })}
      {(_SearchArray.length === 0) ? <span>No results!</span> : null}

    </div>
  )
}

export default GroceryBagSearchResults