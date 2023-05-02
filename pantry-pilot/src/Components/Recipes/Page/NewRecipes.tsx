import React, { useState, useEffect, useRef, useMemo } from 'react'

// Function Imports
import { getRecipeTagsBulk } from '../../Structural/RecipeHelpers'

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
import { Button } from 'react-bootstrap';

type Props = {
    newRecipes: any,
    selectedIngredients: any,
}

function NewRecipes({ newRecipes, selectedIngredients }: Props) {
    // const [recipeTabs, setRecipeTabs] = useState<any>([])
    const [recipeTabContent, setRecipeTabContent] = useState<any>([])
    const [activeTab, setActiveTab] = useState<string>('recipes')
    const recipeTabs = useMemo(() => getRecipeTagsBulk(newRecipes), [newRecipes])

    function RecipeTabGroup({visable} : any) {
        return (
            <div className={(visable ? 'visible': 'd-none')}>
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

    function TabBtn({ btnText, btnType }: any) {
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

    return (
        <div className='container'>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                <Row>
                    <Col sm={3} className='sticky-top new-recipies-side-nav'>
                        {/* <Tabs
                            defaultActiveKey="tabs"
                            id="RecipeTabs"
                            className="mb-3"
                            fill
                        >
                            <Tab eventKey="tabs" title="Recipes">
                                <RecipeTabGroup />
                            </Tab>
                            <Tab eventKey="utility" title="Tools">
                                <RecipeUtility />
                            </Tab>

                        </Tabs> */}
                        <div className='col-12 d-flex recipe-side-pane-header'>
                            <TabBtn btnText='Recipes' btnType='recipes' />
                            <TabBtn btnText='Tools' btnType='tools' />
                        </div>
                        <div className='recipe-side-pane-content'>
                            <RecipeTabGroup visable={activeTab === 'recipes'}/>
                            <RecipeUtility visable={activeTab === 'tools'} />
                        </div>

                    </Col>

                    <Col sm={9}>
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