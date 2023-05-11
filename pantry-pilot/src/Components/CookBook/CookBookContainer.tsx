import React, { useState, useEffect, useRef, useMemo } from 'react'
import debounce from 'lodash.debounce';
// Component Imports
import CookBookTile from './CookBookTile'
import CookBookHeader from './CookBookHeader'

// Function Imports
import { getRecipeTags } from '../Structural/RecipeHelpers'

//event emitter imports
import { Events, eventEmitter } from '../Structural/Emitter';

import { Recipe } from '../../Types/RecipeObject'

//Icon Imports
import { BiGridSmall, BiGridAlt } from 'react-icons/bi'

type Props = {
  cookbook: Recipe[],
}

type SliderFilterVals = {
  sliderName: string,
  sliderValue: number,
}

function CookBookContainer({ cookbook }: Props) {
  const [cookbookState, setCookbookState] = useState(cookbook);
  const [recipieTags, setRecipieTags] = useState<any>({});
  const [sliderRanges, setSliderRanges] = useState<any>({});
  const [sliderValues, setSliderValues] = useState<any>(sliderRanges);
  const [sort, setSort] = useState("NONE");
  const [lastSort, setLastSort] = useState("NONE");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [healthScoreFilter, setHealthScoreFilter] = useState(0);


  const sliderNamesMap: any = {
    'Health Score': 'healthScore',
    'Cost Per Recipe': 'pricePerServing',
    'Time To Make': 'readyInMinutes',
    'Calories': 'calories',
    'Carbs': 'carbs',
    'Fat': 'fat',
    'Protein': 'protein',
  }


  // Slider Filters UseEffect removes the debounce function on unmount
  useEffect(() => {
    return () => {
      _handleSliderChange.cancel();
    };
  });
  const _handleSliderChange = useMemo(() => {
    return debounce(setSliderFilterVals, 200);
  }, []);
  function setSliderFilterVals(sliderName: string, passedSliderValues: number[]) {
    let tmpSliderValues = sliderValues;
    tmpSliderValues[sliderNamesMap[sliderName]] = passedSliderValues;
    setSliderValues({ ...tmpSliderValues });
    console.log("Slider Values updated!")

  }



  // Get the tags for each recipe and slider ranges
  useEffect(() => {
    setCookbookState(cookbook);
    // let tagsOBJ: any = getAllTags();

    let tagsOBJ: any = {};
    let sliderRanges: any = {
      'healthScore': [0, 100],
      'pricePerServing': [0, 0], // Remember to multiply by servings
      'readyInMinutes': [0, 0],
      'calories': [0, 0],
      'carbs': [0, 0],
      'fat': [0, 0],
      'protein': [0, 0],
    };
    for (let i = 0; i < cookbook.length; i++) {
      // Get the tags for each recipe
      const tags = getRecipeTags(cookbook[i]);
      tagsOBJ[cookbook[i].id.toString()] = tags;

      // Get the slider ranges

      sliderRanges['pricePerServing'][0] = Math.min(sliderRanges['pricePerServing'][0], cookbook[i].pricePerServing);
      sliderRanges['pricePerServing'][1] = Math.max((sliderRanges['pricePerServing'][1]), (cookbook[i].pricePerServing / 100));

      sliderRanges['readyInMinutes'][0] = Math.min(sliderRanges['readyInMinutes'][0], cookbook[i].readyInMinutes);
      sliderRanges['readyInMinutes'][1] = Math.max(sliderRanges['readyInMinutes'][1], cookbook[i].readyInMinutes);

    }
    for (let key in tagsOBJ) {
      let nutritionInfo = tagsOBJ[key].nutritionInfo;
      for (let nutrient in nutritionInfo) {
        let value = nutritionInfo[nutrient];
        // console.log(nutrient, value, sliderRanges)
        if (sliderRanges[nutrient]) {

          sliderRanges[nutrient][0] = Math.min(sliderRanges[nutrient][0], value);
          sliderRanges[nutrient][1] = Math.max(sliderRanges[nutrient][1], value);
        }
      }
    }

    console.log(sliderRanges)
    console.log(tagsOBJ)
    setRecipieTags(tagsOBJ);
    setSliderRanges(sliderRanges);
    setSliderValues(sliderRanges);

  }, [cookbook]);

  function getAllTags() {
    let tagsOBJ: any = {};
    for (let i = 0; i < cookbook.length; i++) {
      const tags = getRecipeTags(cookbook[i]);
      tagsOBJ[cookbook[i].id.toString()] = tags;
    }
    return tagsOBJ;
  }

  useEffect(() => {
    if (cookbook.length <= 0) {
      return
    }
    console.log("Cookbook State Changed!")

    // Sort by the selected sort
    let filteredCookBook = [...cookbook];

    // narrow by radio filters from the sorted list
    if (filters.length > 0) {
      filteredCookBook = filteredCookBook.filter((recipe: any) => {
        console.log(recipieTags[recipe.id.toString()].dietTags)
        const { dietTags } = recipieTags[recipe.id.toString()]
        for (let i = 0; i < filters.length; i++) {
          if (!dietTags.includes(filters[i])) {
            return false;
          }
        }
        return true;
      });
    }

    // narrow by slider filters from the filtered list
    // console.log(sliderValues === sliderRanges)
    if (sliderValues !== sliderRanges) {
      let sliderValuesKeys: string[] = Object.keys(sliderValues);
      let sliderValuesValues: number[][] = Object.values(sliderValues);
      for (let i = 0; i < sliderValuesKeys.length; i++) {
        const sliderName = sliderValuesKeys[i];
        const sliderValue: number[] = sliderValuesValues[i];
        filteredCookBook = filteredCookBook.filter((recipe: any) => {
          const { nutritionInfo } = recipieTags[recipe.id.toString()];
          const { pricePerServing, readyInMinutes, healthScore } = recipe;

          if (sliderName === "pricePerServing") {
            console.log(pricePerServing, '>=', sliderValue[0])
            console.log(pricePerServing, '<=', sliderValue[1])
            return pricePerServing >= sliderValue[0] && pricePerServing <= (sliderValue[1] * 100);
          } else if (sliderName === "readyInMinutes") {
            return readyInMinutes >= sliderValue[0] && readyInMinutes <= sliderValue[1];
          } else if (sliderName === "healthScore") {
            return healthScore >= sliderValue[0] && healthScore <= sliderValue[1];
          } else {
            return nutritionInfo[sliderName] >= sliderValue[0] && nutritionInfo[sliderName] <= sliderValue[1];
          }
        });
      }
    }


    if (lastSort !== sort) {
      if (sort === "NUM-MISSING") {
        filteredCookBook.sort((a: any, b: any) => {
          return a.missedIngredientsList.length - b.missedIngredientsList.length;
        });
      } else if (sort === "COST-PER") {
        filteredCookBook.sort((a: any, b: any) => {
          return (a.pricePerServing * a.servings) - (b.pricePerServing * b.servings);
        });
      } else if (sort === "TIME-TO-MAKE") {
        filteredCookBook.sort((a: any, b: any) => {
          console.log(a.title, b.title)
          console.log(a["readyInMinutes"], b["readyInMinutes"])
          return a["readyInMinutes"] - b["readyInMinutes"];
        });
      } else if (sort === "HEALTH-SCORE") {
        filteredCookBook.sort((a: any, b: any) => {
          return a.healthScore - b.healthScore;
        });
      } else if (sort === "NUM-OF-INGREDIENTS") {
        filteredCookBook.sort((a: any, b: any) => {
          return a.extendedIngredients.length - b.extendedIngredients.length;
        });
      } else {
        filteredCookBook = cookbook;
      }
      setLastSort(sort);
    }


    // narrow by search from the filtered list
    const filteredAndSortedCookBook = [...filteredCookBook];
    if (search !== "") {
      filteredCookBook = filteredAndSortedCookBook.filter((recipe: any) => {
        return recipe.title.toLowerCase().includes(search.toLowerCase());
      });
    }

    setCookbookState(filteredCookBook);
  }, [sort, search, filters, sliderValues]);




  return (
    <div className='d-flex outer-cookbook-container container app-font flex-wrap'>
      <div className='col-3 d-inline-flex'>
        <CookBookHeader
          search={search}
          setSearch={setSearch}
          setSort={setSort}
          filters={filters}
          setFilters={setFilters}
          setSliderFilterVals={_handleSliderChange}
          sliderRanges={sliderRanges}
        />
      </div>
      <div className='cookbook-container col-xl-9 col-12 container'>
        <div className='col-12 cookbook-container d-flex'>
          <div className='col-12 cookbook-container-header btm-brd' >
            <h3 className=' col-12 '>Saved Recipes</h3>
          </div>
          {cookbookState.length !== 0 ?
            (cookbookState.map((recipe: any, index: number) => {
              const _recipeTags = recipieTags[recipe?.id.toString()];
              return (
                <CookBookTile recipe={recipe} key={index} recipeTags={_recipeTags} />
              )

            }))
            : (<div>No results!</div>)
          }
        </div>
      </div>
    </div>
  )
}

export default CookBookContainer