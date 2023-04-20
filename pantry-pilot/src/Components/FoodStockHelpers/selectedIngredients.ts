export function addToSelectedIngredients(newIngredient : any, selectedIngredients: any){
    let tmp = [...selectedIngredients];
    // console.log("Selected: ", selectedIngredients)
    // console.log("New: ", newIngredient)
    tmp.push(newIngredient);
    console.log(tmp)
    return tmp;

}

export async function removeFromSelectedIngredients(ingredientToRemove : any, selectedIngredients: any){
    
    let tmp = [...selectedIngredients].filter((ingredient: any) => {
        console.log(ingredient._id !== ingredientToRemove._id, ingredient.foodName)
        return(ingredient._id !== ingredientToRemove._id)
    });
    return tmp;
}