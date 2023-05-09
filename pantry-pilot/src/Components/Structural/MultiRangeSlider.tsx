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
  const [sliderValue, setSliderValue] = useState([Min, Max])

  

  useEffect(() => {
    // console.log(name, sliderValue)
    setValue(name, sliderValue)
  }, [sliderValue])


  return (
    <div className='cookbook-header-filter-slider col-12'>
      <div >{name}</div>
      <div className='d-flex flex-row justify-content-evenly col-12'>
        <div className='col-2 slider-itm'>{sliderValue[0]}</div>
        <div className='col-7 slider-itm'>
          <Slider
            ref={sliderRef}
            range
            min={Min}
            max={Max}
            defaultValue={[Min, Max]}
            onChange={(data) => {setSliderValue(data)}}
            
            
          />
        </div>

        <div className='col-2 slider-itm'>{sliderValue[1]}</div>
      </div>

    </div>
  );
}

export default MultiRangeSlider