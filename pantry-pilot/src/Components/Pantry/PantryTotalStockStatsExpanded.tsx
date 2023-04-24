import React, { useState, useEffect, useRef } from 'react'

// Bootstrap Imports
import { Modal } from 'react-responsive-modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';

//Component Imports
import CategoryStatsGraph from '../Structural/CategoryStatsGraph';

//Google Chart Imports
import { Chart } from "react-google-charts";

type Props = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    stats: any
}

function PantryTotalStockStatsExpanded({ open, setOpen, stats }: Props) {
    const [pantryCategoriesData, setPantryCategoriesData] = useState<any>([]);
    const [pantryFoodData, setPantryFoodData] = useState<any>([]);

    useEffect(() => {
        let tmpPantryCharData: any = [];
        tmpPantryCharData.push(['Category', 'Quantity']);
        stats?.categoryStats?.forEach((category: any) => {
            tmpPantryCharData.push([category.categoryName, category.totalItems]);
        })
        setPantryCategoriesData(tmpPantryCharData);

        tmpPantryCharData = [];
        tmpPantryCharData.push(['Food', 'Quantity']);
        stats?.foodStats?.forEach((food: any) => {
            tmpPantryCharData.push([food.foodName, food.totalItems]);
        })
        setPantryFoodData(tmpPantryCharData);
    }, [stats])


    console.log(stats)


    const pantryStats = (
        <div>
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
        </div>
    )

    const categoryStatsGraphOptions = {
        backgroundColor: 'transparent',
        title: 'Pantry Breakdown by Category'
    };
    const categoryStats = (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Total Foods</th>
                        <th>Close to Expiring</th>
                        <th>Expired</th>

                    </tr>
                </thead>
                <tbody>
                    {stats?.categoryStats?.map((category: any, index: number) => {
                        return (
                            <tr key={category.categoryId}>
                                <td>{index + 1}</td>
                                <td>{category.categoryName}</td>
                                <td>{category.totalItems}</td>
                                <td>{category.totalCloseToExpiring}</td>
                                <td>{category.totalExpired}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )

    const foodStatsGraphOptions = {
        backgroundColor: 'transparent',
        is3D: false,
        title: 'Pantry Breakdown by Food'
    };
    const foodStats = (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Food</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Close to Expiring</th>
                        <th>Expired</th>
                    </tr>
                </thead>
                <tbody>
                    {stats?.foodStats?.map((food: any, index: number) => {
                        return (
                            <tr key={food.foodId}>
                                <td>{index + 1}</td>
                                <td>{food.foodName}</td>
                                <td>{food.categoryName}</td>
                                <td>{food.totalItems}</td>
                                <td>{food.totalCloseToExpiring}</td>
                                <td>{food.totalExpired}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )


    return (
        <div>
            <Modal open={open} onClose={() => { setOpen(false) }} center>
                <div>
                    <h1>Your Pantry Stats</h1>
                </div>
                <div>
                    <Tabs
                        defaultActiveKey="Pantry"
                        id="stats-tabs"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="Pantry" title="Pantry">
                            {pantryStats}
                        </Tab>
                        <Tab eventKey="Categories" title="Categories" >
                            <Tabs
                                defaultActiveKey="CategoryStatsTable"
                                id="category-stats-tabs"
                                className="mb-3"
                                variant='pills'
                                justify>
                                <Tab eventKey="CategoryStatsTable" title="Table">
                                    <div className='col-12'>
                                        {categoryStats}
                                    </div>
                                </Tab>
                                <Tab eventKey="CategoryStatsGraph" title="Graph">
                                    <div style={{ height: "400px", width: "400px" }}>
                                        <Chart
                                            chartType="PieChart"
                                            data={pantryCategoriesData}
                                            height={"400px"}
                                            width={"400px"}
                                            options={categoryStatsGraphOptions}
                                        />
                                    </div>

                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab eventKey="Foods" title="Foods">
                            <Tabs
                                defaultActiveKey="CategoryStatsTable"
                                id="category-stats-tabs"
                                className="mb-3"
                                variant='pills'
                                justify>
                                <Tab eventKey="CategoryStatsTable" title="Table">
                                    <div className='col-12'>
                                        {foodStats}
                                    </div>
                                </Tab>
                                <Tab eventKey="CategoryStatsGraph" title="Graph">
                                    <div className='col-6 d-inline-flex align-items-center'>
                                        <Chart
                                            chartType="PieChart"
                                            data={pantryFoodData}
                                            options={foodStatsGraphOptions}
                                            width={"200px"}
                                            height={"400px"}
                                        />
                                    </div>

                                </Tab>
                            </Tabs>
                            <div className='d-flex align-items-center'>
                                <div className='col-6'>

                                </div>

                            </div>

                        </Tab>
                    </Tabs>
                </div>


            </Modal>
        </div>
    )
}

export default PantryTotalStockStatsExpanded