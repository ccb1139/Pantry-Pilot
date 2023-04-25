
import '../../../css/NutrtionLabel.scss'
import React from 'react'

type Props = {
    rd: any,
    fullSize: boolean,
}

function NutritionLabel({ rd, fullSize }: Props) {
    function getNLAmount(index: number) {
        return Math.round(rd.nutrition.nutrients[index].amount)
    }
    function getNLUnit(index: number) {
        return rd.nutrition.nutrients[index].unit
    }
    function getNLString(index: number) {
        return `${getNLAmount(index)}${getNLUnit(index)}`
    }

    function getNLPercent(index: number) {
        return Math.round(rd.nutrition.nutrients[index].percentOfDailyNeeds) + "%"
    }

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
                                Dietary Fiber {getNLString(22)}
                            </th>
                            <td>
                                <b>{getNLPercent(22)}</b>
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
                        <tr className={ fullSize ? "thick-end" : ""}>
                            <th colSpan={2}>
                                <b>Protein</b> {getNLString(9)}
                            </th>
                            <td>
                                <b>{getNLPercent(9)}</b>
                            </td>
                        </tr>
                    </tbody>
                </table>
                { fullSize ?
                <>
                <table className="performance-facts__table--grid">
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                Vitamin A
                                10%
                            </td>
                            <td>
                                Vitamin C
                                0%
                            </td>
                        </tr>
                        <tr className="thin-end">
                            <td colSpan={2}>
                                Calcium
                                10%
                            </td>
                            <td>
                                Iron
                                6%
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