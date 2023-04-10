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
}
type Category = {
    categoryName: string,
    foods: any[]
}
function PantryDynamicShelves({ pantry, setPantry, viewType, handleTileClick, categorySort, sortType }: PantryBodyProps) {
    const [categories, setCategories] = useState<object[]>(getCategories(pantry, setPantry));
    const [fridge, setFridge] = useState<any[]>(pantry[0]?.fridge);
    const [activeKeyIndexs, setActiveKeyIndexs] = useState<string[]>(["0"]);
    const [search, setSearch] = useState<string>("");

    //Sort States
    const [currentSort, setCurrentSort] = useState<string>("NONE");


    useEffect(() => {
        setCategories([{ "categoryName": "All", "unifiedEmoji": "1f37d-fe0f", "foodNames": [] }]);
        setActiveKeyIndexs(getCategories(pantry, setPantry).map((category: any, index: number) => {
            return index.toString();
        }))
        setFridge(pantry[0]?.fridge);
    }, [pantry])

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
        if(sortType === currentSort) return;
        setCurrentSort(sortType);
        console.log(sortType);
        if (sortType === "EXP-DATE-SORT") {
            setFridge([...fridge].sort((a: any, b: any) => {
                return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
            }))
        } else if (sortType === "NAME-SORT" ) {
            setFridge([...fridge].sort((a: any, b: any) => {
                return a.foodName.localeCompare(b.foodName)
            }))
        } else if (sortType === "QUANTITY-SORT") {
            // setFridge([...fridge].sort((a: any, b: any) => {
            //     return b.quantity - a.quantity
            // }))
        } else {
            setFridge(pantry[0]?.fridge);
        }
    }, [sortType])

    // eventEmitter.subscribe('SORT-TYPE', (sortType: string) => {
    //     if(sortType === currentSort) return;
    //     setCurrentSort(sortType);
    //     console.log(sortType);
    //     if (sortType === "EXP-DATE-SORT") {
    //         setFridge([...fridge].sort((a: any, b: any) => {
    //             return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
    //         }))
    //     } else if (sortType === "NAME-SORT" ) {
    //         setFridge([...fridge].sort((a: any, b: any) => {
    //             return a.foodName.localeCompare(b.foodName)
    //         }))
    //     } else if (sortType === "QUANTITY-SORT") {
    //         // setFridge([...fridge].sort((a: any, b: any) => {
    //         //     return b.quantity - a.quantity
    //         // }))
    //     } else {
    //         setFridge(pantry[0]?.fridge);
    //     }
    // })

    // useEffect(() => {
    //     if (sortByEXPDATE || sortByNAME || sortByQUANTITY) {
    //         if (sortByEXPDATE) {
    //             setFridge([...fridge].sort((a: any, b: any) => {
    //                 return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
    //             }))
    //         } else if (sortByNAME) {
    //             setFridge([...fridge].sort((a: any, b: any) => {
    //                 return a.foodName.localeCompare(b.foodName)
    //             }))
    //         } else if (sortByQUANTITY) {
    //             // setFridge([...fridge].sort((a: any, b: any) => {
    //             //     return b.quantity - a.quantity
    //             // }))

    //         }
    //     }
    //     else {
    //         setFridge(pantry[0]?.fridge);
    //     }
    // }, [sortByEXPDATE, sortByNAME, sortByQUANTITY])

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
    // eventEmitter.subscribe('EXP-DATE-SORT', (sortByEXPDATE: boolean) => {
    //     setSortByEXPDATE(sortByEXPDATE);
    // })
    // eventEmitter.subscribe('NAME-SORT', (sortByNAME: boolean) => {
    //     setSortByName(sortByNAME);
    // })
    // eventEmitter.subscribe('QUANTITY-SORT', (sortByQUANTITY: boolean) => {
    //     setSortByQUANTITY(sortByQUANTITY);
    // })
    
    return (
        <div className='d-flex flex-wrap justify-content-center '>

            <Accordion flush activeKey={activeKeyIndexs} alwaysOpen className='w-100' >
                {categories.map((category: any, index: number) => {
                    return (

                        <Accordion.Item eventKey={index.toString()} bsPrefix='other'>
                            <Accordion.Header
                                bsPrefix='other'
                                onClick={() => handleAccordianHeaderClick(index.toString())}>
                                <Emoji unified={category.unifiedEmoji} />
                                <div className='pantry-category-name'>
                                    {category.categoryName}
                                </div>
                            </Accordion.Header>
                            <Accordion.Body className='d-flex flex-wrap justify-content-evenly'>
                                {fridge.map((food: any) => {
                                    // Category Sort check, if true, then only show foods that match the category
                                    if (food.category === category.categoryName || category.categoryName === "All") {
                                        // Search check, if true, then only show foods that match the search
                                        if (food.foodName?.toLowerCase().trim().includes(search)
                                            || food.foodName?.includes(search)) {
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
                                                    />
                                            )
                                        }
                                    }
                                })}
                            </Accordion.Body>
                        </Accordion.Item>

                    )
                })}
            </Accordion>

        </div>
    )
}

export default PantryDynamicShelves