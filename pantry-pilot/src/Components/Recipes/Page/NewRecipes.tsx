import React, { useState, useEffect, useRef, useMemo } from 'react'

// Function Imports
import { getRecipeTagsBulk } from '../../Structural/RecipeHelpers'

// Helper Functions
import { findUsedIng } from './UserIngredientsTS/FindUsedIng'
import { getCategoryEmojiByName } from '../../../Components/FoodStockHelpers/pantryAPI'

//Bootstrap Imports
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// Component Imports
import RecipeCard from './RecipeCard'
import RecipieTab from './RecipeTab'
import RecipeUtility from './RecipeUtility';
import PageBackButton from '../../Structural/PageBackButton';
import { Button } from 'react-bootstrap';

type Props = {
    newRecipes: any,
    selectedIngredients: any,
    cookbook: any,
    pantry: any,
}

function NewRecipes({ newRecipes, selectedIngredients, cookbook, pantry }: Props) {
    // const [recipeTabs, setRecipeTabs] = useState<any>([])
    const [recipeTabContent, setRecipeTabContent] = useState<any>([])
    const [activeTab, setActiveTab] = useState<string>('recipes')
    const [inCookbookIds, setInCookbookIds] = useState<any>([])
    const recipeTabs = useMemo(() => getRecipeTagsBulk(newRecipes), [newRecipes])


    useEffect(() => {

        if (cookbook.length > 0) {
            const tmpIdObj: any = Object.create(null)
            // console.log("cookbook", cookbook)
            // SEts the recipe id as the key and the server id as the value
            for (let recipe of cookbook) {
                tmpIdObj[recipe.id] = recipe._id
            }
            setInCookbookIds(tmpIdObj)
            // console.log("tmpIdObj", tmpIdObj)
        }


    }, [cookbook])


    console.log(selectedIngredients)
    return (
        <div className='d-flex position-relative'>
            <PageBackButton show={true} path={(selectedIngredients.length !== 0) ? "/pantry" : "/cookbook"}/>
            <div className='container'>
                
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <Row>
                        <Col sm={3} className='sticky-top new-recipies-side-nav'>
                            <div className='col-12 d-flex recipe-side-pane-header'>
                                <TabBtn btnText='Recipes' btnType='recipes' activeTab={activeTab} setActiveTab={setActiveTab} />
                                <TabBtn btnText='Tools' btnType='tools' activeTab={activeTab} setActiveTab={setActiveTab} />
                            </div>
                            <div className='recipe-side-pane-content'>
                                <RecipeTabGroup visable={activeTab === 'recipes'} recipeTabs={recipeTabs} />
                                <RecipeUtility visable={activeTab === 'tools'} />
                            </div>

                        </Col>

                        <Col sm={9}>
                            <Tab.Content>
                                {recipeTabs?.map((tab: any, index: number) => {
                                    let hrefString = "#link" + (index)
                                    // console.log(tab, " tab")
                                    let inCookbook = false
                                    let recipeData = newRecipes[index]
                                    if (inCookbookIds[tab.id]) {
                                        inCookbook = true
                                        recipeData._id = inCookbookIds[tab.id]
                                    }

                                    // console.log(tab.title, inCookbook, " inCookbook")
                                    return (
                                        <Tab.Pane eventKey={hrefString} key={index}>
                                            <RecipeCard
                                                recipeData={recipeData}
                                                tagData={tab}
                                                selectedIngredients={selectedIngredients}
                                                inCookbook={inCookbook}
                                                pantry={pantry}
                                            />
                                        </Tab.Pane>
                                    )
                                })
                                }


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
        </div>
    )
}
function TabBtn({ btnText, btnType, activeTab, setActiveTab }: any) {
    const btnClass = activeTab === btnType ? 'active-tab-btn' : ''
    return (
        <div
            className={'custom-tab-btn ' + btnClass}
            onClick={() => { setActiveTab(btnType) }}

        >
            {btnText}
        </div>
    )
}

function RecipeTabGroup({ visable, recipeTabs }: any) {
    return (
        <div className={(visable ? 'visible' : 'd-none')}>
            <ListGroup variant=''>
                {recipeTabs?.map((tab: any, index: number) => {
                    let hrefString = "#link" + index
                    return (
                        <ListGroup.Item
                            action
                            href={hrefString}
                            key={index}
                            variant='light'
                        // bsPrefix
                        >
                            <RecipieTab tabData={tab} />
                        </ListGroup.Item>
                    )
                })}


            </ListGroup>
        </div>
    )
}


export default NewRecipes