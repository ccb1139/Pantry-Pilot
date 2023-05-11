import React, { useState, useEffect, useRef, useMemo } from 'react'

//Sider Imports
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

//Bootstrap Imports
import { Tooltip } from 'react-bootstrap';

type Props = {
  name: string,
  setValue: any,
  Min: number,
  Max: number,

}

function MultiRangeSlider({ name, setValue, Min, Max }: Props) {
  const sliderRef = useRef<HTMLInputElement>(null);
  const [sliderValue, setSliderValue] = useState<Number[] | any>([Min, Max])
  const [_Min, set_Min] = useState<Number>()
  const [_Max, set_Max] = useState<Number>()
  const [renderSlider, setRenderSlider] = useState<boolean>(false)
  type SliderStringMap = {
    [sliderName: string]: (value: number) => string;
  }
  const sliderStringMap: SliderStringMap = {
    "Health Score": (value: number) => { return (value.toString()) },
    "Cost Per Recipe": (value: number) => { return (`$${value.toFixed(2)}`) },
    "Time To Make": (value: number) => { return (value.toString() + ' min') },
    "Calories": (value: number) => { return (value.toFixed(0)) + ' cal' },
    "Carbs": (value: number) => { return (value.toString() + 'g') },
    "Fat": (value: number) => { return (value.toString() + 'g') },
    "Protein": (value: number) => { return (value.toString() + 'g') },
  }


  useEffect(() => {
    if (name !== 'Health Score') {
      if (Max !== 0) {
        setSliderValue([Min, Max])
        setRenderSlider(true)
      }
    } else {
      setRenderSlider(true)
    }
  }, [Min, Max])

  let min = Min
  let max = Max
  useEffect(() => {
    // console.log(name, sliderValue)
    // set_Min(sliderValue[0])
    // set_Max(sliderValue[1])
    setValue(name, sliderValue)
  }, [sliderValue])

  return (
    <div className='cookbook-header-filter-slider col-12'>

      {
        renderSlider
          ? <>
            <div className='slider-body col-12'>
              <div className='col-3 slider-label-l'><span>{sliderStringMap[name](sliderValue[0])}</span></div>
              <div className='col-6 d-flex justify-content-center'>{name}</div>
              <div className='col-3 slider-label-r '><span>{sliderStringMap[name](sliderValue[1])}</span></div>
            </div>
            <div className='d-flex flex-row justify-content-evenly col-12'>

              <div className='col-11 slider-itm pb-1'>
                <Slider
                  ref={sliderRef}
                  range
                  min={Min}
                  max={Max}
                  // min={sliderValue[0]}
                  // max={sliderValue[1]}
                  defaultValue={[sliderValue[0], sliderValue[1]]}
                  // defaultValue={[_Min, _Max]}
                  onChange={(data) => { setSliderValue(data) }}
                />
              </div>

            </div>
          </>
          : null
      }

    </div>
  );
}

export default MultiRangeSlider