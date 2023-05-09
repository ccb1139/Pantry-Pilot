import { getCategoryEmojiByName } from '../../../FoodStockHelpers/pantryAPI'

export async function findUsedIng(recipeData: any, selectedIngredients: any, pantry: any) {
    // What we need to collect with this function:
    // - We need to look at the ingredients used in the recipie
    // - Then figure out if we have those ingredients in our pantry
    // - Then figure out if any of the selected ingredients are not used in the recipie

    const { fridge } = pantry[0]

    let usedIngredients = [];
    let unusedIngredients = [];
    let missingIngredients = [];

    let indToRemoveExtIng: any = {};

    let extendedIngredients = [...recipeData.extendedIngredients];
    // console.log("extendedIngredients PRE-LOOP", extendedIngredients);
    // console.log(fridge);
    // console.log(Object.keys(totalStockObject).length);

    for (let i = 0; i < extendedIngredients.length; i++) {
        const element = extendedIngredients[i];
        const { name, nameClean, orignal, orignalName } = {
            name: element.name.trim().toLowerCase().replace(/\s/g, ""),
            nameClean: element.nameClean.trim().toLowerCase().replace(/\s/g, ""),
            orignal: element.original.trim().toLowerCase().replace(/\s/g, ""),
            orignalName: element.originalName.trim().toLowerCase().replace(/\s/g, ""),
        };

        // Finds all of the used ingredients from the selectedIngredients in the recipie
        for (let j = 0; j < selectedIngredients.length; j++) {
            const { foodName } = { foodName: selectedIngredients[j].foodName?.trim().toLowerCase().replace(/\s/g, "") };
            if (name.includes(foodName) || nameClean.includes(foodName) || orignal.includes(foodName) || orignalName.includes(foodName)) {
                usedIngredients.push(selectedIngredients[j]);
                // extendedIngredients.splice(i, 1);
                indToRemoveExtIng[foodName] = i;
                break
            }
        }

        // Finds all of the used ingredients from the pantry in the recipie
        for (let j = 0; j < fridge.length; j++) {
            const { foodName } = { foodName: fridge[j].foodName?.trim().toLowerCase().replace(/\s/g, "") };
            if (indToRemoveExtIng.hasOwnProperty(foodName)) {
                continue;
            }
            if (name.includes(foodName) || nameClean.includes(foodName) || orignal.includes(foodName) || orignalName.includes(foodName)) {

                const emoji = getCategoryEmojiByName(fridge[j].category, pantry, () => { })
                const fullFoodItmData = {
                    foodName: fridge[j].foodName,
                    category: fridge[j].category,
                    emoji: emoji,
                    expirationDate: fridge[j].expirationDate,
                    inSelectedIngredients: false,
                }
                usedIngredients.push(fullFoodItmData);
                // extendedIngredients.splice(i, 1);
                indToRemoveExtIng[foodName] = i;
                break
            }
        }
        // console.log(recipeData.title, extendedIngredients)

        // console.log(recipeData.title, indToRemove)

    }

    // Remove the used ingredients from the extended ingredients
    const keys = Object.keys(indToRemoveExtIng).reverse();
    for (const foodnameInd of keys) {
        extendedIngredients.splice(indToRemoveExtIng[foodnameInd], 1);
    }

    for (let sI = 1; sI < selectedIngredients.length; sI++) {
        const { foodName } = { foodName: selectedIngredients[sI].foodName?.trim().toLowerCase().replace(/\s/g, "") };
        if (!indToRemoveExtIng.hasOwnProperty(foodName)) {
            unusedIngredients.push(selectedIngredients[sI]);
        }
    }

    missingIngredients = [...extendedIngredients]

    // console.log("usedIngredients", usedIngredients, "unusedIngredients", unusedIngredients, "missingIngredients", missingIngredients);

    return { usedIngredients, unusedIngredients, missingIngredients };

}