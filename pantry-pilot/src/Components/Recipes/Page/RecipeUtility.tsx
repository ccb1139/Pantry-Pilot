import React, { useState } from 'react'

//Components
import Timer from './Timer'
import UnitConversionCalc from './UnitConversionCalc'

// CSS Imports
import '../../../css/RecipeUtility.css'

// Bootstrap Imports
import Form from 'react-bootstrap/Form';

//Event emitter
import { eventEmitter } from '../../Structural/Emitter'



type Props = {
    visable: boolean;
}

function RecipeUtility({ visable }: Props) {
    const [unit, setUnit] = useState<string>('metric');


    // console.log(remainingTime)


    function changeUnit() {
        if (unit === 'metric') {
            setUnit('us')
            eventEmitter.dispatch('changeUnit', 'us')
        } else {
            setUnit('metric')
            eventEmitter.dispatch('changeUnit', 'metric')
        }
        eventEmitter.unsubscribe('changeUnit')
    }


    return (
        <div className={'recipe-utility-container ' + (visable ? 'visible' : 'd-none')}>
            <div className='recipe-utility-item recipe-utility-units d-flex align-items-center justify-content-between'>

                <h5 className='mb-0 '>Unit:</h5>
                <div className='d-flex align-items-center justify-content-center'>
                    <Form.Check className='mx-2 '>
                        <Form.Check.Input type="checkbox" checked={unit === 'metric'} onChange={() => { changeUnit() }} />
                        <Form.Check.Label>Metric</Form.Check.Label>
                    </Form.Check>


                    <Form.Check className='mx-2'>
                        <Form.Check.Input type="checkbox" checked={unit === 'us'} onChange={() => { changeUnit() }} />
                        <Form.Check.Label>US</Form.Check.Label>
                    </Form.Check>
                </div>

            </div>
            <div className='recipe-utility-item recipe-utility-timer'>
                <Timer />

            </div>
            <div className='recipe-utility-item recipe-utility-unit-conversion'>
                <UnitConversionCalc />
            </div>
        </div>
    )
}

export default RecipeUtility