import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

//Bootstrap imports
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

//Icon Imports
import { AiOutlineClose } from 'react-icons/ai'

type Props = {
    recipeData: any,
}

interface Ingredient {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    measures: {
        us: {
            amount: number;
            unitShort: string;
            unitLong: string;
        };
        metric: {
            amount: number;
            unitShort: string;
            unitLong: string;
        };
    };
}

function Ingredients({ recipeData }: Props) {
    const { extendedIngredients, usedIngredients, missedIngredients, unusedIngredients, servings } = recipeData
    const [sortedIngredients, setSortedIngredients] = useState<Ingredient[]>([]);
    const [unit, setUnit] = useState<string>('metric');
    const [scaledServings, setScaledServings] = useState<number>(servings);


    useEffect(() => {
        const sorted = extendedIngredients.sort((a: Ingredient, b: Ingredient) => {
            if (a.aisle < b.aisle) {
                return -1;
            }
            if (a.aisle > b.aisle) {
                return 1;
            }
            return 0;
        });
        setSortedIngredients(sorted);
        setScaledServings(servings);
    }, [recipeData])

    // console.log(sortedIngredients)
    return (
        <div className='d-flex flex-column'>
            <div className='d-flex flex-row align-items-center justify-content-evenly'>
                <div className='col-5 d-flex align-items-center justify-content-center'>


                    <Form.Check className='mx-2'>
                        <Form.Check.Input type="checkbox" checked={unit === 'metric'} onChange={() => { setUnit('metric') }} />
                        <Form.Check.Label>Metric</Form.Check.Label>
                    </Form.Check>


                    <Form.Check className='mx-2'>
                        <Form.Check.Input type="checkbox" checked={unit === 'us'} onChange={() => { setUnit('us') }} />
                        <Form.Check.Label>US</Form.Check.Label>
                    </Form.Check>



                </div>
                <div className='col-4 d-flex align-items-center'>
                    <div className='col-11 d-flex align-items-center'>
                        <span className='pe-1 '>Servings:</span>
                        <Form.Control type="number" size="sm" min={1} value={scaledServings} onChange={(event) => { setScaledServings(Number(event.target.value)) }} />

                    </div>
                    <div className='col-1 ms-1 d-flex align-items-center'>
                        {(scaledServings !== servings) ?
                            <AiOutlineClose onClick={() => { setScaledServings(servings) }} />
                            : null}
                    </div>


                </div>

            </div>
            <div>
                <Table borderless hover size='sm'>
                    <tbody className=''>
                        {sortedIngredients?.map((ingredient: any, index: number) => {
                            const { nameClean, measures } = ingredient
                            let unitCorrection = measures[unit].unitShort;
                            if (unitCorrection === '') {
                                unitCorrection = 'servings'
                            }
                            const unitFullString = Math.round(measures[unit].amount * scaledServings) + " " + unitCorrection

                            // console.log({measures.unit.amount}, {measures[unit].unitShort})
                            return (

                                <tr key={index}>
                                    <td className='ingredient-table-ing'>{nameClean}</td>
                                    <td className='ingredient-table-unit'>{unitFullString}</td>

                                </tr>
                            )
                        })
                        }
                    </tbody>
                </Table>
            </div>

        </div>
    )
}

export default Ingredients