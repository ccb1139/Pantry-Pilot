import React, { useState, useEffect } from 'react'

import GroceryBagTile from './GroceryBagTile'

//Bootstrap Imports
import Button from 'react-bootstrap/Button';

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
        <div className='d-flex flex-column category' >
            <div className='col-12 selected-title d-inline-flex'>
                {categoryName}:
                { (foodNames.length > 0) ?
                <div className='ms-auto'>
                    <Button variant="outline-danger" size='sm' onClick={() => { setSelected([]) }}>Clear</Button>
                </div>
                :null}
            </div>
            <div className='col-12 selected-body'>

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