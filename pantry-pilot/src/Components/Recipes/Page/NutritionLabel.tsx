
import '../../../css/NutrtionLabel.scss'
import React, { useState, useEffect, useRef } from 'react'

type Props = {
    rd: any,
    fullSize: boolean,
}

function NutritionLabel({ rd, fullSize }: Props) {
    const [nutritionLabel, setNutritionLabel] = useState<any>([])
    

    useEffect(() => {
        /* 
        INDEXS:
        0: Calories
        1: Total Fat
        2: Saturated Fat
        3: Carbohydrates
        4: Vitamin A
        5: Sugar
        6: Cholesterol
        7: Sodium
        8: Fiber
        9: Protein
        10: Iron
        11: Dietary Fiber 
        12: Vitamin C
        13: Calcium
        14: Iron        
        */
        let tmpNutritionLabel: any = new Array(15).fill(0);
        for (let infoObj of rd.nutrition.nutrients) {
            let obj = {
                name: infoObj.name,
                amount: infoObj.amount,
                unit: infoObj.unit,
                percentOfDailyNeeds: infoObj.percentOfDailyNeeds
            };
            switch (infoObj.name) {
                case "Calories":
                    tmpNutritionLabel[0] = obj;
                    break;
                case "Fat":
                    tmpNutritionLabel[1] = obj;
                    break;
                case "Saturated Fat":
                    tmpNutritionLabel[2] = obj;
                    break;
                case "Carbohydrates":
                    tmpNutritionLabel[3] = obj;
                    break;
                case "Vitamin A":
                    tmpNutritionLabel[4] = obj;
                    break;
                case "Sugar":
                    tmpNutritionLabel[5] = obj;
                    break;
                case "Cholesterol":
                    tmpNutritionLabel[6] = obj;
                    break;
                case "Sodium":
                    tmpNutritionLabel[7] = obj;
                    break;
                case "Fiber":
                    tmpNutritionLabel[8] = obj;
                    break;
                case "Protein":
                    tmpNutritionLabel[9] = obj;
                    break;
                case "Iron":
                    tmpNutritionLabel[10] = obj;
                    break;
                case "Fiber":
                    tmpNutritionLabel[11] = obj;
                    break;
                case "Vitamin C":
                    tmpNutritionLabel[12] = obj;
                    break;
                case "Calcium":
                    tmpNutritionLabel[13] = obj;
                    break;
                case "Iron":
                    tmpNutritionLabel[14] = obj;
                    break;
                default:
                    break;
            }
            }
            // console.log(tmpNutritionLabel)
            setNutritionLabel(tmpNutritionLabel)
        }, [rd])

    function convertToGrams(amount: number, unit: string) {
        const unitFactors: any = {
            'kg': 1000,
            'hg': 100,
            'dag': 10,
            'g': 1,
            'dg': 0.1,
            'cg': 0.01,
            'mg': 0.001,
            'µg': 0.000001,
            'ng': 0.000000001,
            'pg': 0.000000000001
        };

        const conversionFactor = unitFactors[unit];

        if (conversionFactor !== undefined) {
            return amount * conversionFactor;
        } else {
            return null; // or throw an error if you prefer
        }
    }
    function getNLAmount(index: number) {
        return Math.round(nutritionLabel[index]?.amount)
    }
    function getNLUnit(index: number) {
        return nutritionLabel[index]?.unit
    }
    function getNLString(index: number) {
        // console.log(convertToGrams(getNLAmount(index), getNLUnit(index)))

        // return `${convertToGrams(getNLAmount(index), getNLUnit(index))}g`
        return `${getNLAmount(index)}${getNLUnit(index)}`
    }

    function getNLPercent(index: number) {
        return Math.round(nutritionLabel[index]?.percentOfDailyNeeds) + "%"
    }
    // console.log(rd.nutrition.nutrients)
    return (
        <div>
            <section className="performance-facts">
                <header className="performance-facts__header">
                    <h1 className="performance-facts__title">Nutrition Facts</h1>
                    <p>Serving Size: {rd.nutrition.weightPerServing.amount} {rd.nutrition.weightPerServing.unit}</p>
                    <p>Serving Per Recipe: {rd.servings}</p>
                </header>
                <table className="performance-facts__table">
                    <thead>
                        <tr>
                            <th colSpan={3} className="small-info">
                                Amount Per Serving
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colSpan={2}>
                                <b>Calories</b> {getNLAmount(0)}
                            </th>
                            <td>
                                Calories from Fat {Math.round((getNLAmount(0) * rd.nutrition.caloricBreakdown.percentFat) / 100)}
                            </td>
                        </tr>
                        <tr className="thick-row">
                            <td colSpan={3} className="small-info">
                                <b>% Daily Value*</b>
                            </td>
                        </tr>
                        <tr>
                            <th colSpan={2}>
                                <b>Total Fat</b> {getNLString(1)}
                            </th>
                            <td>
                                <b>{getNLPercent(1)}</b>
                            </td>
                        </tr>
                        <tr>
                            <td className="blank-cell">
                            </td>
                            <th>
                                Saturated Fat {getNLString(2)}
                            </th>
                            <td>
                                <b>{getNLPercent(2)} </b>
                            </td>
                        </tr>
                        <tr>
                            <td className="blank-cell">
                            </td>
                            <th>
                                Trans Fat
                                0g
                            </th>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <th colSpan={2}>
                                <b>Cholesterol</b> {getNLString(6)}
                            </th>
                            <td>
                                <b>{getNLPercent(6)}</b>
                            </td>
                        </tr>
                        <tr>
                            <th colSpan={2}>
                                <b>Sodium</b> {getNLString(7)}
                            </th>
                            <td>
                                <b> {getNLPercent(7)} </b>
                            </td>
                        </tr>
                        <tr>
                            <th colSpan={2}>
                                <b>Total Carbohydrate</b> {getNLString(3)}
                            </th>
                            <td>
                                <b> {getNLPercent(3)}</b>
                            </td>
                        </tr>
                        <tr>
                            <td className="blank-cell">
                            </td>
                            <th>
                                Dietary Fiber {getNLString(8)}
                            </th>
                            <td>
                                <b>{getNLPercent(8)}</b>
                            </td>
                        </tr>
                        <tr>
                            <td className="blank-cell">
                            </td>
                            <th>
                                Sugars {getNLString(5)}
                            </th>
                            <td>
                                <b>{getNLPercent(5)}</b>
                            </td>
                        </tr>
                        <tr className={fullSize ? "thick-end" : ""}>
                            <th colSpan={2}>
                                <b>Protein</b> {getNLString(9)}
                            </th>
                            <td>
                                <b>{getNLPercent(9)}</b>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {fullSize ?
                    <>
                        <table className="performance-facts__table--grid">
                            <tbody>
                                <tr>
                                    <td colSpan={2}>
                                        Vitamin A {getNLPercent(4)}
                                    </td>
                                    <td>
                                        Vitamin C {getNLPercent(12)}
                                    </td>
                                </tr>
                                <tr className="thin-end">
                                    <td colSpan={2}>
                                        Calcium {getNLPercent(13)}
                                    </td>
                                    <td>
                                        Iron {getNLPercent(10)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <p className="small-info">* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs:</p>

                        <table className="performance-facts__table--small small-info">
                            <thead>
                                <tr>
                                    <td colSpan={2}></td>
                                    <th>Calories:</th>
                                    <th>2,000</th>
                                    <th>2,500</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th colSpan={2}>Total Fat</th>
                                    <td>Less than</td>
                                    <td>65g</td>
                                    <td>80g</td>
                                </tr>
                                <tr>
                                    <td className="blank-cell"></td>
                                    <th>Saturated Fat</th>
                                    <td>Less than</td>
                                    <td>20g</td>
                                    <td>25g</td>
                                </tr>
                                <tr>
                                    <th colSpan={2}>Cholesterol</th>
                                    <td>Less than</td>
                                    <td>300mg</td>
                                    <td>300 mg</td>
                                </tr>
                                <tr>
                                    <th colSpan={2}>Sodium</th>
                                    <td>Less than</td>
                                    <td>2,400mg</td>
                                    <td>2,400mg</td>
                                </tr>
                                <tr>
                                    <th colSpan={3}>Total Carbohydrate</th>
                                    <td>300g</td>
                                    <td>375g</td>
                                </tr>
                                <tr>
                                    <td className="blank-cell"></td>
                                    <th colSpan={2}>Dietary Fiber</th>
                                    <td>25g</td>
                                    <td>30g</td>
                                </tr>
                            </tbody>
                        </table>

                        <p className="small-info">
                            Calories per gram:
                        </p>
                        <p className="small-info text-center">
                            Fat 9
                            &bull;
                            Carbohydrate 4
                            &bull;
                            Protein 4
                        </p>
                    </>
                    : null}
            </section></div>
    )
}

export default NutritionLabel