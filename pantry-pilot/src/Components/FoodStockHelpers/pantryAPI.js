import axios from 'axios';
{/* Documentation: 
    This file contains all the functions that will be used to interact with the foodStock object
    The foodStock object is a collection of 3 objects: categories, fridge, and totalStock
    The categories object is an array of objects that contain the category name and an array of food names
    The fridge object is an array of objects that contain the food name, category, and expiration date
    The totalStock object is an array of objects that contain the food name, category, and quantity
*/}

// This functions updates the pantry object in the database and sets the state
export function sendPantryToServer(newPantry, pantry, setPantry) {
    console.log(newPantry);
    axios
        .put("http://localhost:4000/foodStock/update-foodStock/" + pantry[0]._id, {
            categories: newPantry.categories,
            fridge: newPantry.fridge,
            totalStock: newPantry.totalStock,
        })
        .then((res) => {
            if (res.status === 200) {
                // console.log("Food successfully updated");
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
        - Change category Emoji | DONE
    - Get Category | DONE
        - Get Cateogry Emoji | DONE
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

    categories: _categories,
            fridge: _fridge,
            totalStock: _totalStock,
    
*/}


// ======================
// CATEGORY FUNCTIONS
// ======================


// Takes CategoryName, foodNames, pantry, and setPantry
// Adds a category to the foodStock
export async function addCategory(categoryName, foodNames, pantry, setPantry) {

    var newPantry = {
        categories: [...pantry[0].categories, { categoryName, foodNames, unifiedEmoji: "1f37d-fe0f" }],
        fridge: pantry[0].fridge,
        totalStock: pantry[0].totalStock,
    }
    return newPantry;
}

// This function removes a foodStock category from the foodStock 
// it takes in the category_id and the pantry and setPantry and removes the with that id category from the pantry
export async function removeCategory(category_id, pantry, setPantry) {
    var newCategories = pantry[0].categories.filter((category) => category._id !== category_id);

    var newPantry = {
        categories: newCategories,
        fridge: pantry[0].fridge,
        totalStock: pantry[0].totalStock,
    }
    return newPantry;
}

// Takes in the category Id, and list of foods and updates the category with that id
// with the new list of foods
export async function updateCategory(category_id, categoryName, foodNames, pantry, setPantry) {
    let newP = pantry;
    // var newCategories = pantry[0].categories.filter((category) => category._id !== category_id);
    for (let i = 0; i < newP[0].categories.length; i++) {
        if (newP[0].categories[i]._id === category_id) {
            newP[0].categories[i].categoryName = categoryName;
            newP[0].categories[i].foodNames = foodNames;
        }
    }
    // newCategories.push({ categoryName, foodNames });
    var newPantry = {
        categories: newP[0].categories,
        fridge: newP[0].fridge,
        totalStock: newP[0].totalStock,
    }
    return newPantry;

}


// Quality of life update Category functions

export async function addFoodToCategory(category_id, foodName, pantry, setPantry) {
    for (let i = 0; i < pantry[0].categories.length; i++) {
        if (pantry[0].categories[i]._id === category_id) {
            pantry[0].categories[i].foodNames.push(foodName);
        }
    }
    // updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, pantry[0].totalStock, pantry, setPantry);

    var newPantry = {
        categories: pantry[0].categories,
        fridge: pantry[0].fridge,
        totalStock: pantry[0].totalStock,
    }
    return newPantry;
}

export async function removeFoodFromCategory(category_id, foodName, pantry, setPantry) {
    for (let i = 0; i < pantry[0].categories.length; i++) {
        // console.log(category_id)
        // console.log(pantry[0].categories[i]._id)
        if (pantry[0].categories[i]._id === category_id) {
            // console.log(pantry[0].categories[i].foodNames);
            
            pantry[0].categories[i].foodNames = pantry[0].categories[i].foodNames.filter((food) => food !== foodName);
        }
    }
    // updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, pantry[0].totalStock, pantry, setPantry);
    var newPantry = {
        categories: pantry[0].categories,
        fridge: pantry[0].fridge,
        totalStock: pantry[0].totalStock,
    }
    
    return newPantry;
}

export async function updateCategoryEmoji(category_id, emoji, pantry, setPantry) {
    for (let i = 0; i < pantry[0].categories.length; i++) {
        if (pantry[0].categories[i]._id === category_id) {
            pantry[0].categories[i].unifiedEmoji = emoji;
        }
    }
    // updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, pantry[0].totalStock, pantry, setPantry);
    var newPantry = {
        categories: pantry[0].categories,
        fridge: pantry[0].fridge,
        totalStock: pantry[0].totalStock,
    }
    return newPantry;
}

export function getCategories(pantry, setPantry) {
    return pantry[0].categories;
}


// Takes in the category id and returns the category with that id
export function getCategory(category_id, pantry, setPantry) {
    for (let i = 0; i < pantry[0].categories.length; i++) {
        if (pantry[0].categories[i]._id === category_id) {
            return (pantry[0].categories[i]);
        }
    }

    return -1;
}

// Gets the emoji of the category
export function getCategoryEmojiById(category_id, pantry, setPantry) {
    for (let i = 0; i < pantry[0].categories.length; i++) {
        if (pantry[0].categories[i]._id === category_id) {
            return (pantry[0].categories[i].unifiedEmoji);
        }
    }

    return -1;
}

export function getCategoryEmojiByName(categoryName, pantry, setPantry) {
    for (let i = 0; i < pantry[0].categories.length; i++) {
        if (pantry[0].categories[i].categoryName === categoryName) {
            return (pantry[0].categories[i].unifiedEmoji);
        }
    }

    return -1;
}

// Function checks if food is in the categories
// Takes in a food name and returns the category name if it is in the categories
export function findInCategory(foodName, pantry, setPantry) {
    for (let i = 0; i < pantry[0].categories.length; i++) {
        for (let j = 0; j < pantry[0].categories[i].foodNames.length; j++) {
            if (pantry[0].categories[i].foodNames[j] === foodName) {
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
export async function addTotalStock(foodName, category, quantity, pantry, setPantry) {
    // updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, [...pantry[0].totalStock, { foodName, category, quantity }], pantry, setPantry);
    var newPantry = {
        categories: pantry[0].categories,
        fridge: pantry[0].fridge,
        totalStock: [...pantry[0].totalStock, { foodName, category, quantity }],
    }
    return newPantry;
}

// Takes in the id and removes the food from the totalStock
export async function removeTotalStock(id, pantry, setPantry) {
    // console.log(pantry[0]);
    var newTotalStock = pantry[0].totalStock.filter((food) => food._id !== id);

    // updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, newTotalStock, pantry, setPantry);

    var newPantry = {
        categories: pantry[0].categories,
        fridge: pantry[0].fridge,
        totalStock: newTotalStock,
    }
    return newPantry;
}

// Takes in the foodName, category, and amount and updates the totalStock with the new amount
// matches the foodName and category to find the food to update
export async function updateTotalStock(name, category, amount, pantry, setPantry) {
    var tmpTotalStock = pantry[0].totalStock;
    for (let i = 0; i < tmpTotalStock.length; i++) {
        if (tmpTotalStock[i].foodName === name && tmpTotalStock[i].category === category) {
            tmpTotalStock[i].quantity = amount;
        }
    }
    // updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, tmpTotalStock, pantry, setPantry);
    var newPantry = {
        categories: pantry[0].categories,
        fridge: pantry[0].fridge,
        totalStock: tmpTotalStock,
    }
    return newPantry;
}

// Takes in the foodName, category, and amount and increments the totalStock with the new amount
export async function increaseTotalStock(name, category, amount, pantry, setPantry) {
    var tmpTotalStock = pantry[0].totalStock;
    for (let i = 0; i < tmpTotalStock.length; i++) {
        if (tmpTotalStock[i].foodName === name && tmpTotalStock[i].category === category) {
            tmpTotalStock[i].quantity += amount;
        }
    }
    // updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, tmpTotalStock, pantry, setPantry);

    var newPantry = {
        categories: pantry[0].categories,
        fridge: pantry[0].fridge,
        totalStock: tmpTotalStock,
    }
    return newPantry;
}

// Takes in the foodName, category, and amount and decrements the totalStock with the new amount
export async function decreaseTotalStock(name, category, amount, pantry, setPantry) {
    var tmpTotalStock = pantry[0].totalStock;
    for (let i = 0; i < tmpTotalStock.length; i++) {
        if (tmpTotalStock[i].foodName === name && tmpTotalStock[i].category === category) {
            tmpTotalStock[i].quantity -= amount;
        }
    }
    // updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, tmpTotalStock, pantry, setPantry);
    var newPantry = {
        categories: pantry[0].categories,
        fridge: pantry[0].fridge,
        totalStock: tmpTotalStock,
    }
    return newPantry;
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

export async function findInTotalStock(foodName, pantry, setPantry) {
    // console.log(totalStock)
    for (let i = 0; i < pantry[0].totalStock.length; i++) {
        if (pantry[0].totalStock[i].foodName === foodName) {
            return pantry[0].totalStock[i];
        }
    }
    return -1;
}

// ======================
// FRIDGE FUNCTIONS
// ======================

// Takes in the foodName, category, expirationDate, pantry, and setPantry and adds the food to the fridge
export async function addFridge(foodName, category, expirationDate, pantry, setPantry) {
    // updateFoodStockHelper(pantry[0].categories, [...pantry[0].fridge, { foodName, category, expirationDate }], pantry[0].totalStock, pantry, setPantry);
    var newPantry = {
        categories: pantry[0].categories,
        fridge: [...pantry[0].fridge, { foodName, category, expirationDate }],
        totalStock: pantry[0].totalStock,
    }
    return newPantry;
}

// Takes in the foodName and category and removes the food from the fridge
export async function removeFridge(id, pantry, setPantry) {
    var newFridge = pantry[0].fridge.filter((food) => food._id !== id);
    // updateFoodStockHelper(pantry[0].categories, newFridge, pantry[0].totalStock, pantry, setPantry);
    var newPantry = {
        categories: pantry[0].categories,
        fridge: newFridge,
        totalStock: pantry[0].totalStock,
    }
    return newPantry;
}

// Takes in the foodName, category, and expirationDate and updates the fridge with the new expirationDate
export async function updateFridge(foodName, category, expirationDate, id, pantry, setPantry) {
    var tmpFridge = pantry[0].fridge;
    for (let i = 0; i < tmpFridge.length; i++) {
        if (tmpFridge[i]._id === id) {
            tmpFridge[i].foodName = foodName;
            tmpFridge[i].category = category;
            const _date = new Date(expirationDate);
            tmpFridge[i].expirationDate = _date;
        }
    }
    // updateFoodStockHelper(pantry[0].categories, tmpFridge, pantry[0].totalStock, pantry, setPantry);
    var newPantry = {
        categories: pantry[0].categories,
        fridge: tmpFridge,
        totalStock: pantry[0].totalStock,
    }
    return newPantry;
}

export function getFridge(pantry, setPantry) {
    return pantry[0].fridge;
}

// Takes in the foodName and category and returns the food with that name and category
export async function findInFridge(foodName, category, expirationDate, pantry, setPantry) {
    var tmpFridge = pantry[0].fridge;
    for (let i = 0; i < tmpFridge.length; i++) {
        if (tmpFridge[i].foodName === foodName && tmpFridge[i].category === category && tmpFridge[i].expirationDate === expirationDate) {
            return tmpFridge[i];
        }
    }
    return -1;
}

// Takes in the foodName and category and returns the food with that name and category
export async function findInFridgeByID(_id, pantry, setPantry) {
    var tmpFridge = pantry[0].fridge;
    for (let i = 0; i < tmpFridge.length; i++) {
        if (tmpFridge[i]._id === _id ) {
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
        - Update Name
    - Get pantry
    
*/}
// Fuction adds a 1 food to the pantry and updates all necessary variables
// Takes in the foodName, category, quantity, pantry, and setPantry
export async function addToPantry(foodName, category, expirationDate, pantry, setPantry) {
    // Add to totalStock
    let newPantry = pantry;
    // console.log(pantry)
    // console.log(pantry[0].totalStock)
    let inFS = await findInTotalStock(foodName, pantry, setPantry);
    if (inFS === -1) {
        newPantry = await addTotalStock(foodName, category, 1, pantry, setPantry);
    } else {
        newPantry = await increaseTotalStock(foodName, category, 1, pantry, setPantry);
    }

    // Add to Fridge
    newPantry = await addFridge(foodName, category, expirationDate, [newPantry], setPantry);

    return newPantry;
    // updateFoodStockHelper(pantry[0].categories, pantry[0].fridge, pantry[0].totalStock, pantry, setPantry);
}


// Fuction removes a 1 food to the pantry and updates all necessary variables
export async function removeFromPantry(foodName, category, expirationDate, pantry, setPantry) {
    let newPantry = pantry[0];
    const tmpDate = new Date(expirationDate);

    let fridgeOBJ = await findInFridge(foodName, category, (tmpDate.toISOString()), pantry, setPantry);
    let inTS = await findInTotalStock(foodName, pantry, setPantry);

    // Remove from Fridge and FoodStock
    // console.log(inTS, fridgeOBJ)
    if(inTS !== -1 && fridgeOBJ !== undefined && fridgeOBJ !== -1) {
        newPantry = await removeFridge(fridgeOBJ._id, pantry, setPantry);
        newPantry = await decreaseTotalStock(foodName, category, 1, [newPantry], setPantry);
    }
    
    return newPantry;
}

export async function changeNameInPantry(foodName, category, expirationDate, _id, pantry, setPantry) {
    let newPantry = pantry[0];
    const tmpDate = new Date(expirationDate);

    let inFridge = await findInFridge(foodName, category, (tmpDate.toISOString()), pantry, setPantry);
    let inTS = await findInTotalStock(foodName, pantry, setPantry);
    let oldName = await findInFridgeByID(_id, pantry, setPantry);
    
    // console.log(oldName.foodName, inTS, inFridge)
    
    // Check if the food name is in the foodstock already
    if (inTS === -1) {
        newPantry = await decreaseTotalStock(oldName.foodName, oldName.category, 1, pantry, setPantry);
        newPantry = await addTotalStock(foodName, category, 1, [newPantry], setPantry);
    } else {
        newPantry = await increaseTotalStock(foodName, category, 1, pantry, setPantry);
    }
 
    newPantry = await updateFridge(foodName, category, expirationDate, _id, [newPantry], setPantry);
    // console.log(newPantry)
    return newPantry;
}

export function getPantry(pantry, setPantry) {
    return pantry[0];
}





