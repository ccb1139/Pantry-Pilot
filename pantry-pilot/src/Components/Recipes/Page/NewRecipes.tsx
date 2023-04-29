import React, { useState, useEffect, useRef, useMemo } from 'react'

import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

// Component Imports
import RecipeCard from './RecipeCard'
import RecipieTab from './RecipeTab'

type Props = {
    newRecipes: any,
    selectedIngredients: any,
}

function NewRecipes({ newRecipes, selectedIngredients }: Props) {
    // const [recipeTabs, setRecipeTabs] = useState<any>([])
    const [recipeTabContent, setRecipeTabContent] = useState<any>([])

    const recipeTabs = useMemo(() => getTabInfo(), [newRecipes])

    function getTabInfo() {
        let tabs: any = []
        for (let i = 0; i < newRecipes.length; i++) {
            const { glutenFree, dairyFree, sustainable, cheap, vegan, vegetarian, veryHealthy } = newRecipes[i];
            const { nutrients } = newRecipes[i].nutrition;

            //Get the tags
            let dietTags = []
            if (glutenFree) dietTags.push("gluten free");
            if (dairyFree) dietTags.push("dairy free");
            if (vegan) dietTags.push("vegan");
            if (vegetarian) dietTags.push("vegetarian");
            if (cheap) dietTags.push("cheap");
            if (sustainable) dietTags.push("sustainable");
            if (veryHealthy) dietTags.push("very healthy");

            //Get the nutrition info
            let nutritionInfo = {
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            }
            for (let i = 0; i < nutrients.length; i++) {
                // console.log(nutrients[i])
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
            tabs.push({
                title: newRecipes[i].title,
                dietTags: dietTags,
                nutritionInfo: nutritionInfo,
                missedIngredients: newRecipes[i].missedIngredients,
            })
        }


        return tabs
    }

    return (
        <div className='container'>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                <Row>
                    <Col sm={2} className='sticky-top new-recipies-side-nav'>
                        <div className=' '>
                            <ListGroup variant=''>

                                {recipeTabs?.map((tab: any, index: number) => {

                                    let hrefString = "#link" + index
                                    return (
                                        <ListGroup.Item 
                                        action href={hrefString} 
                                        key={index}
                                        variant='light'
                                        // bsPrefix
                                        >
                                            <RecipieTab tabData={tab} />
                                        </ListGroup.Item>
                                    )
                                })
                                }


                            </ListGroup>
                        </div>
                    </Col>

                    <Col sm={10}>
                        <Tab.Content>
                            {recipeTabs?.map((tab: any, index: number) => {
                                let hrefString = "#link" + index
                                return (
                                    <Tab.Pane eventKey={hrefString} key={index}>
                                        <RecipeCard
                                            recipeData={newRecipes[index]}
                                            tagData={tab}
                                            selectedIngredients={selectedIngredients}
                                        />
                                    </Tab.Pane>
                                )
                            })
                            }
                            <Tab.Pane eventKey="#link1">
                            </Tab.Pane>

                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            {/* {newRecipes?.map((recipe: any) => {
                return (
                    <RecipeCard
                        recipeData={recipe}
                    />
                )
            })} */}

        </div>
    )
}

export default NewRecipes