import * as RecipeTypes from '../../Types/RecipeObject'



// This function takes an array of recipe objects and returns an array of tab objects containing information about the recipes.
export function getRecipeTagsBulk(Recipes: RecipeTypes.Recipe[]) {

    // Define an empty array to store the tab objects
    let tabs: any = []

    // Iterate through each recipe object in the array
    for (let i = 0; i < Recipes.length; i++) {

        // Extract the relevant fields from the recipe object
        const { glutenFree, dairyFree, sustainable, cheap, vegan, vegetarian, veryHealthy } = Recipes[i];
        const { nutrients } = Recipes[i].nutrition;

        // Define an array to store the diet tags
        let dietTags = []

        // Check each relevant field and add the corresponding diet tag to the array if it is true
        if (glutenFree) dietTags.push("gluten free");
        if (dairyFree) dietTags.push("dairy free");
        if (vegan) dietTags.push("vegan");
        if (vegetarian) dietTags.push("vegetarian");
        if (cheap) dietTags.push("cheap");
        if (sustainable) dietTags.push("sustainable");
        if (veryHealthy) dietTags.push("very healthy");

        // Define an object to store the nutrition information
        let nutritionInfo = {
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        }

        // Iterate through each nutrient object in the nutrition field and add the corresponding value to the nutritionInfo object
        for (let i = 0; i < nutrients.length; i++) {
            const { name, amount } = nutrients[i]
            if (name == "Calories") {
                nutritionInfo.calories = amount
            }
            if (name == "Fat") {
                nutritionInfo.fat = amount
            }
            if (name == "Carbohydrates") {
                nutritionInfo.carbs = amount
            }
            if (name == "Protein") {
                nutritionInfo.protein = amount
            }
        }

        // Create a tab object with the extracted information and push it to the tabs array
        tabs.push({
            title: Recipes[i].title,
            id: Recipes[i].id,
            dietTags: dietTags,
            nutritionInfo: nutritionInfo,
            missedIngredients: Recipes[i].missedIngredientsList,
        })
    }

    // Return the array of tab objects
    return tabs
}


// This function take a recipe and returns an object with the diet tags and nutrition information
export function getRecipeTags(recipe: RecipeTypes.Recipe) {
    const { glutenFree, dairyFree, sustainable, cheap, vegan, vegetarian, veryHealthy } = recipe;
    const { nutrients } = recipe.nutrition;
  
    // Define an object to hold the nutrition information
    const nutritionInfo = {
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    };
  
    // Loop through the nutrients array and add up the totals
    for (let i = 0; i < nutrients.length; i++) {
      const { name, amount } = nutrients[i];
      switch (name) {
        case 'Calories':
          nutritionInfo.calories = amount;
          break;
        case 'Fat':
          nutritionInfo.fat = amount;
          break;
        case 'Carbohydrates':
          nutritionInfo.carbs = amount;
          break;
        case 'Protein':
          nutritionInfo.protein = amount;
          break;
        default:
          break;
      }
    }
  
    // Define an array to hold the diet tags
    const dietTags = [];
  
    // Add tags to the array if they are true
    if (glutenFree) dietTags.push('gluten free');
    if (dairyFree) dietTags.push('dairy free');
    if (vegan) dietTags.push('vegan');
    if (vegetarian) dietTags.push('vegetarian');
    if (cheap) dietTags.push('cheap');
    if (sustainable) dietTags.push('sustainable');
    if (veryHealthy) dietTags.push('very healthy');
  
    // Define an array to hold the recipe tabs
  
    // Return the tabs array
    
    return {
        title: recipe.title,
        dietTags: dietTags,
        nutritionInfo: nutritionInfo,
        missedIngredients: recipe.missedIngredientsList.length,
      };
  }

