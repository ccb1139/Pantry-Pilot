import React, { useState, useEffect } from 'react'

import GroceryBagTile from './GroceryBagTile'

function GroceryBagCategory({categoryName, foodNames, _id, selected, setSelected}) {

    function addToSelected(foodName) {
        setSelected([...selected, foodName])

    }

    useEffect(() => {
        // console.log(selected)
    }, [selected])


    return (
        <div className='d-flex flex-column border'>
            <div className='col-12'>
                {categoryName}
            </div>
            <div className='col-12 '>

                {foodNames?.map((foodName) => {
                    return (
                        <GroceryBagTile
                            foodName={foodName}
                            categoryName={categoryName}
                            key={foodName}
                            selected={selected}
                            setSelected={addToSelected}
                        />
                    )
                })
                }
            </div>
        </div>
    )
}

export default GroceryBagCategory