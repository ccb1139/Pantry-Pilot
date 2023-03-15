import axios from 'axios';
{/* Documentation: 
    This file contains all the functions that will be used to interact with the foodStock object
    The foodStock object is a collection of 3 objects: categories, fridge, and totalStock
    The categories object is an array of objects that contain the category name and an array of food names
    The fridge object is an array of objects that contain the food name, category, and expiration date
    The totalStock object is an array of objects that contain the food name, category, and quantity
*/}

function updateFoodStockHelper(_categories, _fridge, _totalStock, pantry, setPantry) {
    axios
        .put("http://localhost:4000/foodStock/update-foodStock/" + pantry[0]._id, {
            categories: _categories,
            fridge: _fridge,
            totalStock: _totalStock,
        })
        .then((res) => {
            if (res.status === 200) {
                // console.log("Food successfully updated");
                // console.log(res.data);
                setPantry([res.data]);
            } else Promise.reject();
        })
        .catch((err) => alert("Something went wrong"));
}

// This function will populate the foodStock with the foodStock object passed in
export function populateFoodStock(_foodStock, pantry, setPantry) {
    axios.post('http://127.0.0.1:4000/foodStock/create-foodStock', _foodStock).then((res) => {
        if (res.status === 200) {
            // console.log(res.data);
            // console.log(res.data._id);
            setPantry([res.data]);
        }
        else
            Promise.reject()
    }).catch(err => alert('Something went wrong'))
}

// This function will add a food to the foodStock
export function clearFoodStock(pantry, setPantry) {
    setPantry([]);
    for (let i = 0; i < pantry.length; i++) {
        // console.log(fridge[i])
        axios
            .delete("http://localhost:4000/foodStock/delete-foodStock/" + pantry[0]._id)
            .then((res) => {
                if (res.status === 200) {
                    // console.log("Fridge successfully deleted");
                    // window.location.reload();
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    }
}

//##################################################
// add or removes for the 3 objects in the foodStock
//##################################################
{/* TO-DO:
    === Catgories ===
    - Add Category | DONE
    - Remove Category | DONE
    - Update Category | DONE
        - Add individual food to category | DONE
        - Remove individual food from category | DONE
    - Get Category | DONE
    - Find Food Category | DONE

    === Total Stock ===
    - Add Total Stock | DONE
    - Remove Total Stock | DONE
    - Update Total Stock | DONE
        - increase individual food amount in total stock | DONE
        - decrease individual food amount in total stock | DONE
    - Get Total Stock | DONE
    - Find Food Total Stock | DONE

    === Fridge ===
    - Add Food to Fridge | DONE
    - Remove Food from Fridge | DONE 
    - Update Food in Fridge | DONE
    - Get Food from Fridge | DONE
    
*/}


// ======================
// CATEGORY FUNCTIONS
// ======================

// Takes CategoryName, foodNames, pantry, and setPantry
// Adds a category to the foodStock
export function addCategory(categoryName, foodNames, pantry, setPantry) {
    updateFoodStockHelper([...pantry[0].categories, { categoryName, foodNames }], pantry[0].fridge, pantry[0].totalStock, pantry, setPantry);
}

// This function removes a foodStock category from the foodStock 
// it takes in the category_id and the pantry and setPantry and removes the with that id category from the pantry
export function removeCategory(category_id, pantry, setPantry) {
    var newCategories = pantry[0].categories.filter((category) => category._id !== category_id);
    updateFoodStockHelper(newCategories, pantry[0].fridge, pantry[0].totalStock, pantry, setPantry);
}

// Takes in the category Id, and list of foods and updates the category with that id
// with the new list of foods
export function updateCategory(category_id, foodNames, pantry, setPantry) {
    // var newCategories = pantry[0].categories.filter((category) => category._id !== category_id);
    for(let i = 0; i < pantry[0].categories.length; i++){
        if(pantry[0].categories[i]._id === category_id){
            pantry[0].categories[i].foodNames = foodNames;
        }
    }
    // newCategories.push({ categoryName, foodNames });
    updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, pantry[0].totalStock, pantry, setPantry);

}

// Quality of life update Category functions

export function addFoodToCategory(category_id, foodName, pantry, setPantry) {
    for(let i = 0; i < pantry[0].categories.length; i++){
        if(pantry[0].categories[i]._id === category_id){
            pantry[0].categories[i].foodNames.push(foodName);
        }
    }
    updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, pantry[0].totalStock, pantry, setPantry);
}

export function removeFoodFromCategory(category_id, foodName, pantry, setPantry) {
    for(let i = 0; i < pantry[0].categories.length; i++){
        if(pantry[0].categories[i]._id === category_id){
            pantry[0].categories[i].foodNames = pantry[0].categories[i].foodNames.filter((food) => food !== foodName);
        }
    }
    updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, pantry[0].totalStock, pantry, setPantry);

}


// Takes in the category id and returns the category with that id
export function getCategory(category_id, pantry, setPantry) {
    for(let i = 0; i < pantry[0].categories.length; i++){
        if(pantry[0].categories[i]._id === category_id){
            return(pantry[0].categories[i]);
        }
    }


}

// Function checks if food is in the categories
// Takes in a food name and returns the category name if it is in the categories
export function findInCategory(foodName, pantry, setPantry) {
    for(let i = 0; i < pantry[0].categories.length; i++){
        for(let j = 0; j < pantry[0].categories[i].foodNames.length; j++){
            if(pantry[0].categories[i].foodNames[j] === foodName){
                return pantry[0].categories[i].categoryName;
            }
        }
    }
    return -1;
}


// ======================
// TOTAL STOCK FUNCTIONS
// ======================

// Takes in the category, foodName, quantity, pantry, and setPantry and adds the food to the totalStock
export function addTotalStock(category, foodName, quantity, pantry, setPantry) {
    updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, [...pantry[0].totalStock, { category, foodName, quantity }], pantry, setPantry);
}

// Takes in the id and removes the food from the totalStock
export function removeTotalStock(id, pantry, setPantry) {
    console.log(pantry[0]);
    var newTotalStock = pantry[0].totalStock.filter((food) => food._id !== id);

    updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, newTotalStock, pantry, setPantry);
}

// Takes in the foodName, category, and amount and updates the totalStock with the new amount
// matches the foodName and category to find the food to update
export function updateTotalStock( name, category, amount, pantry, setPantry) {
    var tmpTotalStock = pantry[0].totalStock;
    for (let i = 0; i < tmpTotalStock.length; i++) {
        if (tmpTotalStock[i].foodName === name && tmpTotalStock[i].category === category) {
            tmpTotalStock[i].quantity = amount;
        }
    }
    updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, tmpTotalStock, pantry, setPantry);
}

// Takes in the foodName, category, and amount and increments the totalStock with the new amount
export function increaseTotalStock(name, category, amount, pantry, setPantry) {
    var tmpTotalStock = pantry[0].totalStock;
    for (let i = 0; i < tmpTotalStock.length; i++) {
        if (tmpTotalStock[i].foodName === name && tmpTotalStock[i].category === category) {
            tmpTotalStock[i].quantity += amount;
        }
    }
    updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, tmpTotalStock, pantry, setPantry);
}

// Takes in the foodName, category, and amount and decrements the totalStock with the new amount
export function decreaseTotalStock(name, category, amount, pantry, setPantry) {
    var tmpTotalStock = pantry[0].totalStock;
    for (let i = 0; i < tmpTotalStock.length; i++) {
        if (tmpTotalStock[i].foodName === name && tmpTotalStock[i].category === category) {
            tmpTotalStock[i].quantity -= amount;
        }
    }
    updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, tmpTotalStock, pantry, setPantry);
}

// Takes in the foodName and category and returns the food with that name and category
export function getTotalStock(name, category, pantry, setPantry) {
    var tmpTotalStock = pantry[0].totalStock;
    for (let i = 0; i < tmpTotalStock.length; i++) {
        if (tmpTotalStock[i].foodName === name && tmpTotalStock[i].category === category) {
            return tmpTotalStock[i];
        }
    }
    return -1;
}

export function findInTotalStock(foodName, pantry, setPantry) {
    for(let i = 0; i < pantry[0].totalStock.length; i++){
        if(pantry[0].totalStock[i].foodName === foodName){
            return pantry[0].totalStock[i];
        }
    }
    return -1;
}

// ======================
// FRIDGE FUNCTIONS
// ======================

// Takes in the foodName, category, expirationDate, pantry, and setPantry and adds the food to the fridge
export function addFridge(foodName, category, expirationDate, pantry, setPantry) {
    updateFoodStockHelper(pantry[0].categories, [...pantry[0].fridge, { foodName, category, expirationDate }], pantry[0].totalStock, pantry, setPantry);
}

// Takes in the foodName and category and removes the food from the fridge
export function removeFridge(id, pantry, setPantry) {
    var newFridge = pantry[0].fridge.filter((food) => food._id !== id);
    updateFoodStockHelper(pantry[0].categories, newFridge, pantry[0].totalStock, pantry, setPantry);
}

// Takes in the foodName, category, and expirationDate and updates the fridge with the new expirationDate
export function updateFridge(id, expirationDate, pantry, setPantry) {
    var tmpFridge = pantry[0].fridge;
    for (let i = 0; i < tmpFridge.length; i++) {
        if (tmpFridge[i]._id === id) {
            const _date = new Date(expirationDate);
            tmpFridge[i].expirationDate = _date;
        }
    }
    updateFoodStockHelper(pantry[0].categories, tmpFridge, pantry[0].totalStock, pantry, setPantry);
}

export function getFridge(pantry, setPantry) {
    return pantry[0].fridge;
}

// Takes in the foodName and category and returns the food with that name and category
export function findInFridge(foodName, category, expirationDate, pantry, setPantry) {
    var tmpFridge = pantry[0].fridge;
    for(let i = 0; i < tmpFridge.length; i++){
        if (tmpFridge[i].foodName === foodName && tmpFridge[i].category === category && tmpFridge[i].expirationDate === expirationDate) {
            return tmpFridge[i];
        }
    }
    return -1;
}




// ======================
// WHOLE PANTRY FUNCTIONS
// ======================
{/* TO-DO:
    ===Pantry===
    - Add to pantry | DONE
    - Remove from pantry | DONE
    - Update in pantry
    - Get pantry
    
*/}
// Fuction adds a 1 food to the pantry and updates all necessary variables
// Takes in the foodName, category, quantity, pantry, and setPantry
export function addToPantry(foodName, category, expirationDate, pantry, setPantry) {
    // Add to totalStock
    if (findInTotalStock(foodName, pantry, setPantry) === -1) {
        addTotalStock(foodName, category, 1, pantry, setPantry);
    } else {
        increaseTotalStock(foodName, category, 1, pantry, setPantry);
    }

    // Add to Fridge
    addFridge(foodName, category, expirationDate, pantry, setPantry);


    // updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, pantry[0].totalStock, pantry, setPantry);
}

// Fuction removes a 1 food to the pantry and updates all necessary variables
export function removeFromPantry(foodName, category, expirationDate, pantry, setPantry) {
    // Remove from Fridge and FoodStock
    const tmpDate = new Date(expirationDate);
    const fridgeOBJ = findInFridge(foodName, category, (tmpDate.toISOString()), pantry, setPantry);
    if (findInTotalStock(foodName, pantry, setPantry) !== -1 && fridgeOBJ !== undefined && fridgeOBJ !== -1) {
        decreaseTotalStock(foodName, category, 1, pantry, setPantry);
        removeFridge(fridgeOBJ._id, pantry, setPantry);
    }
}

export function getPantry(pantry, setPantry) {
    return pantry[0];
}





