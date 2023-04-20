import React, { useState, useEffect } from 'react'

//Component Imports
import PantryTile from './PantryTile'
import PantryList from './PantryList'

//Bootstrap Imports
import Accordion from 'react-bootstrap/Accordion';

//Emojii Imports
import { Emoji } from 'emoji-picker-react';

//API Imports
import {
    getCategoryEmojiByName,
    getCategories,
} from '../FoodStockHelpers/pantryAPI';


//Emmiter Imports
import { Events, eventEmitter } from '../Structural/Emitter';

type PantryBodyProps = {
    pantry: any,
    setPantry: React.Dispatch<React.SetStateAction<any>>,
    viewType: string,
    handleTileClick: (type: string, subType: string, category: string, foodName: string | Date, expirationDate: string | Date, emoji: string, _id: string) => void,
    categorySort: boolean,
    sortType: string,
    stats: any,
    newRemovedFoodForComponent: any,
    newAddedFoodForComponent: any
}
type Category = {
    categoryName: string,
    foods: any[]
}
function PantryDynamicShelves({ pantry, setPantry, viewType, handleTileClick, categorySort, sortType, stats, newRemovedFoodForComponent, newAddedFoodForComponent }: PantryBodyProps) {
    const [categories, setCategories] = useState<object[]>(getCategories(pantry, setPantry));
    const [fridge, setFridge] = useState<any[]>(pantry[0]?.fridge);
    const [activeKeyIndexs, setActiveKeyIndexs] = useState<string[]>(["0"]);
    const [search, setSearch] = useState<string>("");

    const [numSearchResultsPerCat, setNumSearchResultsPerCat] = useState<any>({});
    const [numSearchResults, setNumSearchResults] = useState<number | unknown>(0);

    

    //Sort States
    const [currentSort, setCurrentSort] = useState<string>("NONE");

    useEffect(() => {
        setNumSearchResults((Object.values(numSearchResultsPerCat).reduce((acc: any, val: any) => acc + val, 0)));
    }, [numSearchResultsPerCat])

    useEffect(() => {
        // console.log("newAddedFoodForComponent", newAddedFoodForComponent)
        setFridge([...fridge].filter((food: any) => {
            // console.log("food._id", food._id, "newRemovedFoodForComponent._id", newAddedFoodForComponent)
            return food._id !== newAddedFoodForComponent._id
        }))
    }, [newAddedFoodForComponent])

    useEffect(() => {
        // console.log("newRemovedFoodForComponent", newRemovedFoodForComponent)
        setFridge([...fridge, newRemovedFoodForComponent])
    }, [newRemovedFoodForComponent])

    useEffect(() => {
        setCategories([{ "categoryName": "All", "unifiedEmoji": "1f37d-fe0f", "foodNames": [] }]);
        setNumSearchResultsPerCat(getCategories(pantry, setPantry).map((category: any) => {
            return category.categoryName;
        }).reduce((obj: any, categoryName: string) => {
            obj[categoryName] = 0;
            return obj;
        }, {}))
        setActiveKeyIndexs(getCategories(pantry, setPantry).map((category: any, index: number) => {
            return index.toString();
        }))
        setFridge(pantry[0]?.fridge);
    }, [pantry])
    // If search is changed, filter the fridge array based off of if item is included in search\
    // To do this setFridge([...pantry[0].fridge])
    // Also calcuates the number of search results per category and sets the state it is an object
    useEffect(() => {
        let newNumSearchResultsPerCat = Object.keys(numSearchResultsPerCat).reduce((acc: any, key) => {
            acc[key] = 0;
            return acc;
        }, {});

        if (search === "") {
            setFridge(pantry[0]?.fridge);
            // setNumSearchResults(0);
        } else {


            setFridge([...pantry[0].fridge].filter((item: any, index: number) => {
                if (item.foodName.trim().toLowerCase().includes(search.toLowerCase())
                    || item.foodName.includes(search.toLowerCase())) {
                    // console.log(index, item.category);
                    newNumSearchResultsPerCat[item.category] = newNumSearchResultsPerCat[item.category] + 1;
                    // setNumSearchResultsPerCat(((tmp: any) => (tmp[item.category] = tmp[item.category] + 1, tmp))(Object.assign({}, numSearchResultsPerCat)));
                    return true;
                } else {
                    // setNumSearchResultsPerCat(((tmp : any ) => (tmp[item.category] = tmp[item.category] - 1, tmp))(Object.assign({}, numSearchResultsPerCat)));
                    return false;
                }
            }))
            setNumSearchResultsPerCat(newNumSearchResultsPerCat);
        }
    }, [search])


    useEffect(() => {
        if (categorySort) {
            setCategories([...getCategories(pantry, setPantry)]);

            setActiveKeyIndexs(getCategories(pantry, setPantry).map((category: any, index: number) => {
                return index.toString();
            }))

        } else {
            setCategories([{ "categoryName": "All", "unifiedEmoji": "1f37d-fe0f", "foodNames": [] }]);
        }


    }, [categorySort])



    // Change Sort
    useEffect(() => {
        if (sortType === currentSort) return;
        setCurrentSort(sortType);
        console.log(sortType);
        if (sortType === "EXP-DATE-SORT") {
            setFridge([...fridge].sort((a: any, b: any) => {
                return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
            }))
        } else if (sortType === "NAME-SORT") {
            setFridge([...fridge].sort((a: any, b: any) => {
                return a.foodName.localeCompare(b.foodName)
            }))
        } else if (sortType === "QUANTITY-SORT") {
            // setFridge([...fridge].sort((a: any, b: any) => {
            //     return b.quantity - a.quantity
            // }))
            console.log(stats);
            var foodCounts: any = {};
            for (let foodStat of stats.foodStats) {
                foodCounts[foodStat.foodName] = foodStat.totalItems;
            }
            console.log(foodCounts);
            setFridge([...fridge].sort((a: any, b: any) => {
                return foodCounts[b.foodName] - foodCounts[a.foodName]
            }))

        } else {
            setFridge(pantry[0]?.fridge);
        }
    }, [sortType])

    function handleAccordianHeaderClick(index: string): void {
        if (activeKeyIndexs.includes(index)) {
            setActiveKeyIndexs(activeKeyIndexs.filter((activeKeyIndex) => {
                return activeKeyIndex !== index;
            }))
        } else {
            setActiveKeyIndexs([...activeKeyIndexs, index])
        }
    }



    eventEmitter.subscribe('search', (search: string) => {
        setSearch(search);
    })



    return (
        <div className='d-flex flex-wrap justify-content-center '>
            {(numSearchResults !== 0) || (search === "") ?
                <Accordion flush activeKey={activeKeyIndexs} alwaysOpen className='w-100' >
                    {categories.map((category: any, index: number) => {
                        if ((search !== "" && numSearchResultsPerCat[category.categoryName] === 0)) {
                            return null;
                        }
                        return (
                            <Accordion.Item eventKey={index.toString()} bsPrefix='other' key={index}>
                                <Accordion.Header
                                    bsPrefix='other'
                                    onClick={() => handleAccordianHeaderClick(index.toString())}>
                                    <Emoji unified={category.unifiedEmoji} />
                                    <div className='pantry-category-name'>
                                        {category.categoryName}
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body className='d-flex flex-wrap justify-content-center'>
                                    {fridge.map((food: any) => {
                                        // Category Sort check, if true, then only show foods that match the category
                                        if (food.category === category.categoryName || category.categoryName === "All") {
                                            return (
                                                viewType === "grid" ?
                                                    <PantryTile
                                                        category={food.category}
                                                        foodName={food.foodName}
                                                        expirationDate={food.expirationDate}
                                                        emoji={getCategoryEmojiByName(food.category, pantry)}
                                                        _id={food._id}
                                                        key={food._id}
                                                        handleTileClick={handleTileClick}
                                                        inSelectedIngredients={false}
                                                    />
                                                    :
                                                    <PantryList
                                                        category={food.category}
                                                        foodName={food.foodName}
                                                        expirationDate={food.expirationDate}
                                                        emoji={getCategoryEmojiByName(food.category, pantry)}
                                                        _id={food._id}
                                                        key={food._id}
                                                        handleTileClick={handleTileClick}
                                                        inSelectedIngredients={false}
                                                    />
                                            )
                                        }
                                    })}
                                </Accordion.Body>
                            </Accordion.Item>

                        )
                    })}
                </Accordion>
                : <div>No results!</div>}
        </div>
    )
}

export default PantryDynamicShelves