import React, { useState, useEffect, useRef } from 'react'

//Component Imports
import CategoryStatsGraph from '../Structural/CategoryStatsGraph';
import PantryTotalStockStatsExpanded from './PantryTotalStockStatsExpanded';

//Google Chart Imports
import { Chart } from "react-google-charts";

//Bootstrap Imports
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import ProgressBar from 'react-bootstrap/ProgressBar';

//Emoij Imports
import { Emoji } from 'emoji-picker-react';

//API Imports
import {
    getCategoryEmojiByName,
    getCategories,
} from '../FoodStockHelpers/pantryAPI';

// Icon Imports
import { AiFillCaretDown, AiFillCaretUp, AiOutlineBars } from 'react-icons/ai';

/*
STATS TO SHOW:
    - GENERAL OVERVIEW
        - Total Number of items in pantry
        - Number of items close to expiring 
        - Number of items that are expired
        - Number of items in each category
    - CATEGORY OVERVIEW
        - Number of items in each category
        - Number of items close to expiring in each category
        - Number of items that are expired in each category
        - How many of each item in each category



*/


type PantryTotalStockStatsProps = {
    pantry: any,
    setPantry: React.Dispatch<React.SetStateAction<any>>,
    stats: any
}

function PantryTotalStockStats({ pantry, setPantry, stats }: PantryTotalStockStatsProps) {
    const [open, setOpen] = useState(false);
    const [openPieChart, setOpenPieChart] = useState(false);
    const [categories, setCategories] = useState<object[]>(getCategories(pantry, setPantry));
    const [catgoriesQuantity, setCategoriesQuantity] = useState<number[]>([0]);

    const [pantryCharData, setPantryCharData] = useState<any>([]);

    const options = {
        width: "auto",
        height: "auto",
        backgroundColor: 'transparent',
        is3D: true
    };

    useEffect(() => {
        let tmpPantryCharData: any = [];
        tmpPantryCharData.push(['Category', 'Quantity']);
        stats?.categoryStats?.forEach((category: any) => {
            tmpPantryCharData.push([category.categoryName, category.totalItems]);
        })
        setPantryCharData(tmpPantryCharData);
    }, [stats])

    return (
        <div className='total-stock-container '>
            <div className='total-stock-stats total-stock-stats-header'>
                <div className='total-stock-stats-subheader d-flex align-items-center justify-content-between'>
                    <h4>Pantry Stats</h4>
                    <div className='total-stats-expand-btn' onClick={() => {setOpen(!open)}}>
                        <AiOutlineBars />
                    </div>
                </div>
                <PantryTotalStockStatsExpanded open={open} setOpen={setOpen} stats={stats} />
                <hr />
                <div className='d-flex flex-row justify-content-between'>
                    <span>Total Foods</span>
                    <span>{stats.totalItems}</span>
                </div>
                <div className='d-flex flex-row justify-content-between'>
                    <span>Close to Expiring</span>
                    <span>{stats.totalCloseToExpiring}</span>
                </div>
                <div className='d-flex flex-row justify-content-between'>
                    <span>Expired</span>
                    <span>{stats.totalExpired}</span>
                </div>
                <CategoryStatsGraph stats={stats} />
                <hr />
            </div>
            {/* MOVE THIS TO MODAL */}
            {/* <Collapse in={open}>
                <div className='total-stock-stats'>
                    <div className='total-stock-stats-body'>
                        <div>
                            {stats?.categoryStats?.map((category: any, index: number) => {
                                if (category.totalItems === 0) {
                                    return null;
                                }
                                return (
                                    <div key={index}>
                                        <h5>{category.categoryName}: {category.totalItems} {(category.totalItems > 1 ? "foods" : "food")}</h5>
                                        <CategoryStatsGraph
                                            stats={
                                                {
                                                    totalItems: category.totalItems,
                                                    totalCloseToExpiring: category.totalCloseToExpiring,
                                                    totalExpired: category.totalExpired
                                                }
                                            }
                                        />
                                    </div>
                                )
                            })
                            }
                        </div>
                        <div>
                            <Chart
                                chartType="PieChart"
                                data={pantryCharData}
                                options={options}
                                width={"auto"}
                            // height={"400px"}
                            />
                        </div>

                    </div>
                </div>
            </Collapse >
            <div className='d-flex flex-column mt-2 align-items-center ts-stats-tab-btn' onClick={() => setOpen(!open)}>

                <div style={{ marginBottom: "-5px" }}>Category Breakdown</div>

                {!open ?
                    <AiFillCaretDown className='ts-stats-tab-btn' size={30} onClick={() => setOpen(!open)} />
                    :
                    <AiFillCaretUp className='ts-stats-tab-btn' size={30} onClick={() => setOpen(!open)} />
                }

            </div> */}

        </div >
    )
}

export default PantryTotalStockStats