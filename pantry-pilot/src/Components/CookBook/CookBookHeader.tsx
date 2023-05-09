import React, { useState, useEffect, useRef } from 'react'
//Component Imports
import SearchBar from '../Structural/SearchBar';
import CookBookHeaderTags from './CookBookHeaderTags';
import MultiRangeSlider from '../Structural/MultiRangeSlider';


//event emitter imports
import { Events, eventEmitter } from '../Structural/Emitter';

//Icon Imports
import { AiOutlineHistory } from 'react-icons/ai'

//Bootstrap Imports
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

type Props = {
  search: string,
  setSearch: any,
  setSort: any,
  filters: string[],
  setFilters: any,
  setSliderFilterVals: any,
  sliderRanges: any,
}

function CookBookHeader({ search, setSearch, setSort, filters, setFilters, setSliderFilterVals, sliderRanges }: Props) {
  console.log(sliderRanges)

  return (
    <div className='cookbook-header-container'>
      <div className='cookbook-header-header'>
        <Link to='/cookbook/recipes' className='no-link-style'>
          <div className='cookbook-btn'>

            <span> View Last Search</span>

            < AiOutlineHistory className='ms-2' />
          </div>
        </Link>
      </div>
      <div className='cookbook-header-body'>
        <div className='cookbook-header-body-item'>
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <Form className='cookbook-header-body-item'>
          <Form.Group as={Row}>
            <div className='col-auto'>
              <Form.Select aria-label="Default select example" onChange={(change) => { setSort(change.target.value) }}>
                <option value="NONE">Sort by</option>
                <option value="NUM-MISSING" ># Missing Ingredients</option>
                <option value="COST-PER">Cost Per Recipe</option>
                <option value="TIME-TO-MAKE">Time to Make</option>
                <option value="HEALTH-SCORE">Health Score</option>
                <option value="NUM-OF-INGREDIENTS">Number of Ingredients</option>
              </Form.Select>
            </div>
          </Form.Group>
        </Form>
        <div className='cookbook-header-body-item'>
          <CookBookHeaderTags filters={filters} setFilters={setFilters} />
        </div>
        <div className='cookbook-header-body-item cookbook-sliders'>

          {
            sliderRanges?.healthScore && (
               <>
                <MultiRangeSlider name={"Health Score"} setValue={setSliderFilterVals} Min={sliderRanges['healthScore'][0]} Max={sliderRanges['healthScore'][1]} />
                <MultiRangeSlider name={"Cost Per Recipe"} setValue={setSliderFilterVals} Min={(sliderRanges['pricePerServing'][0])} Max={sliderRanges['pricePerServing'][1]} />
                <MultiRangeSlider name={"Time To Make"} setValue={setSliderFilterVals} Min={sliderRanges['readyInMinutes'][0]} Max={sliderRanges['readyInMinutes'][1]} />
                <MultiRangeSlider name={"Calories"} setValue={setSliderFilterVals} Min={sliderRanges['calories'][0]} Max={sliderRanges['calories'][1]} />
                <MultiRangeSlider name={"Carbs"} setValue={setSliderFilterVals} Min={sliderRanges['carbs'][0]} Max={sliderRanges['carbs'][1]} />
                <MultiRangeSlider name={"Fat"} setValue={setSliderFilterVals} Min={sliderRanges['fat'][0]} Max={sliderRanges['fat'][1]} />
                <MultiRangeSlider name={"Protein"} setValue={setSliderFilterVals} Min={sliderRanges['protein'][0]} Max={sliderRanges['protein'][1]} />
              </>)
              
          }

        </div>
      </div>

    </div>
  )
}




export default CookBookHeader

