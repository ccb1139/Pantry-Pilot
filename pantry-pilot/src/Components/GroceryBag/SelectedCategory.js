import React, { useState, useEffect } from 'react'

import GroceryBagTile from './GroceryBagTile'

function SelectedCategory({categoryName, foodNames, _id, setSelected}) {

    function editSelected(foodName, categoryName, startDate, index, type) {
        // setSelected([...selected, foodN ame])
        // console.log(foodName, categoryName, startDate, index, type)
        if (type === "remove") {
            let temp = [...foodNames]
            temp.splice(index, 1)
            setSelected(temp)
        } else if (type === "update") {
            let temp = [...foodNames]
            temp[index].expirationDate = startDate
            setSelected(temp)
        }

    }

    return (
        <div className='d-flex flex-column border'>
            <div className='col-12'>
                {categoryName}
            </div>
            <div className='col-12 '>

                {foodNames?.map((fItm, index) => {
                    return (
                        <GroceryBagTile
                            foodName={fItm.foodName}
                            categoryName={fItm.categoryName}
                            key={index}
                            handleClickFunc={editSelected}
                            inSelected
                            expDate={fItm.expirationDate}
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