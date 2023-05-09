import React, { useState, useRef, useMemo } from 'react'
import convert from 'convert-units'


type Props = {}

function UnitConversionCalc({ }: Props) {
    const firstSelectRef = useRef<any>(null)
    const firstInpRef = useRef<any>(null)
    const secondSelectRef = useRef<any>(null)
    const secondInpRef = useRef<any>(null)

    // console.log(convert().from('cup').possibilities('volume'))
    const massOptions = ['mg', 'g', 'kg', 'oz', 'lb'];
    const volumeOptions = ['tsp', 'Tbs', 'fl-oz', 'cup', 'pnt', 'qt', 'gal', 'ml', 'l', 'kl']

    const allOptions = useMemo(() => getAllOptions(), [massOptions, volumeOptions])
    const allOptionsObj = useMemo(() => {
        const options: any = {};
        massOptions.forEach(option => options[option] = true);
        volumeOptions.forEach(option => options[option] = true);
        return options;
    }, [massOptions, volumeOptions])
    const [convertTo, setConvertTo] = useState<string[]>(['g', 'kg', 'oz', 'lb', 'tsp', 'Tbs', 'in3', 'fl-oz', 'cup', 'pnt', 'qt', 'gal', 'ml', 'l', 'kl'])

    function getAllOptions(): any[] {
        var allOptions = []
        for (let mOption of massOptions) {
            allOptions.push(convert().describe(mOption))
        }
        for (let vOption of volumeOptions) {
            // console.log(convert().describe(vOption))
            allOptions.push(convert().describe(vOption))
        }
        return allOptions
    }

    function getOptions(event: any) {
        const { value } = event.target
        const selectedUnit = allOptions[value]
        let convertOptions = convert().from(selectedUnit.abbr).possibilities(selectedUnit.measure)
        setConvertTo(convertOptions.filter((option: string) => { return option! in allOptionsObj }))
        
    }

    function convertNums() {
        const firstInp = firstInpRef.current.value
        const secondInp = secondInpRef.current.value
        const firstSelect = allOptions[firstSelectRef.current.value]
        const secondSelect = secondSelectRef.current.value
        console.log(firstInp, firstSelect, secondSelect)
        let converted;
        try {
            converted = convert(firstInp).from(firstSelect.abbr).to(`${secondSelect}`)
            secondInpRef.current.value = converted
        } catch (error) {
            console.log(firstSelect.measure)
            const { measure } = firstSelect

            secondInpRef.current.value = parseFloat(Number(convert(firstInp).from(firstSelect.abbr).to((measure === 'volume') ? 'ml' : 'kg')).toFixed(2));
        }        
        // secondInpRef.current.value = converted
    }


    return (
        <div className='UNC-input'>
            <h5>Convert:</h5>
            <div className='d-flex'>
                <div className='convert-to'>
                    <input type='number' ref={firstInpRef} defaultValue={0} onChange={() => {convertNums()}}/>
                    <select name="" id="" ref={firstSelectRef} onChange={(e) => { getOptions(e); convertNums(); }}>
                        {allOptions.map((option, index) => {
                            const { measure, abbr } = option
                            return <option key={index} value={index}> {option.singular} </option>
                        })
                        }
                    </select>
                </div>
                <span> = </span>
                <div className='convert-from'>
                    <input type='number' ref={secondInpRef} defaultValue={0} onChange={() => {convertNums()}} disabled />
                    <select ref={secondSelectRef} name="" id="" onChange={() => {convertNums()}}>
                        {convertTo?.map((unit, index) => {
                            
                            return <option key={index} value={unit} >{(convert().describe(unit)).singular}</option>
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default UnitConversionCalc