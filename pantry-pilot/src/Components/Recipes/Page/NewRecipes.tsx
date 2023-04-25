import React, { useState, useEffect, useRef } from 'react'

import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

// Component Imports
import RecipeCard from './RecipeCard'

type Props = {
    newRecipes: any,
}

function NewRecipes({ newRecipes }: Props) {
    const [recipeTabs, setRecipeTabs] = useState<any>([])
    const [recipeTabContent, setRecipeTabContent] = useState<any>([])

 
    useEffect(() => {
        let tabs: any = []
        let tabContent: any = []
        newRecipes.forEach((recipe: any) => {tabs.push(recipe.title)})
        setRecipeTabs(tabs)
        // setRecipeTabContent(tabContent)
        console.log("recipeTabs", tabs)
        console.log(newRecipes)
    }, [newRecipes])

    return (
        <div>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                <Row>
                    <Col sm={4}>
                        <ListGroup>
                            {recipeTabs?.map((tab: any, index:number) => {
                                let hrefString = "#link"+index
                                return (
                                    <ListGroup.Item action href={hrefString}>
                                        {tab}
                                    </ListGroup.Item>
                                )
                            })
                            }


                        </ListGroup>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                            {recipeTabs?.map((tab: any, index:number) => {
                                let hrefString = "#link"+index
                                return (
                                    <Tab.Pane eventKey={hrefString}>
                                        <RecipeCard
                                            recipeData={newRecipes[index]}
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