import React, { useState, useEffect } from 'react'

import GroceryBagTile from './GroceryBagTile'

function SelectedCategory({categoryName, foodNames, _id, selected, setSelected}) {

    function editSelected(foodName, index, remove) {
        // setSelected([...selected, foodN ame])
        console.log(foodName, index)
        if (remove) {
            let temp = [...foodNames]
            temp.splice(index, 1)
            setSelected(temp)
        }

    }

    useEffect(() => {
        console.log(selected)
    }, [selected])


    return (
        <div className='d-flex flex-column border'>
            <div className='col-12'>
                {categoryName}
            </div>
            <div className='col-12 '>

                {foodNames?.map((foodName, index) => {
                    return (
                        <GroceryBagTile
                            foodName={foodName}
                            categoryName={categoryName}
                            key={index}
                            selected={true}
                            setSelected={editSelected}
                            showDatePicker
                            ind={index}
                        />
                    )
                })
                }
            </div>
        </div>
    )
}

export default SelectedCategory