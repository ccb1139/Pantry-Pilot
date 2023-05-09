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
  const [sort, setSort] = useState("NONE");
  const [lastSort, setLastSort] = useState("NONE");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [healthScoreFilter, setHealthScoreFilter] = useState(0);

  // Slider Filters UseEffect removes the debounce function on unmount
  useEffect(() => {
    return () => {
      _handleSliderChange.cancel();
    };
  });
  const _handleSliderChange = useMemo(() => {
    return debounce(setSliderFilterVals, 200);
  }, []);
  function setSliderFilterVals(sliderName: string, sliderValues: number[]) {
    // console.log(sliderName, sliderValues);
  }

  // Get the tags for each recipe and slider ranges
  useEffect(() => {
    setCookbookState(cookbook);
    console.log(cookbook)
    // let tagsOBJ: any = getAllTags();
    let tagsOBJ: any = {};
    let sliderRanges: any = {
      'healthScore': [0, 100],
      'pricePerServing': [0, 5000], // Remember to multiply by servings
      'readyInMinutes': [0, 100],
      'calories': [0, 1000],
      'carbs': [0, 100],
      'fat': [0, 100],
      'protein': [0, 100],
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

    // Sort by the selected sort
    let sortedCookBook = [...cookbook];
    if (lastSort !== sort) {
      if (sort === "NUM-MISSING") {
        sortedCookBook.sort((a: any, b: any) => {
          return a.missedIngredientsList.length - b.missedIngredientsList.length;
        });
      } else if (sort === "COST-PER") {
        sortedCookBook.sort((a: any, b: any) => {
          return (a.pricePerServing * a.servings) - (b.pricePerServing * b.servings);
        });
      } else if (sort === "TIME-TO-MAKE") {
        sortedCookBook.sort((a: any, b: any) => {
          console.log(a.title, b.title)
          console.log(a["readyInMinutes"], b["readyInMinutes"])
          return a["readyInMinutes"] - b["readyInMinutes"];
        });
      } else if (sort === "HEALTH-SCORE") {
        sortedCookBook.sort((a: any, b: any) => {
          return a.healthScore - b.healthScore;
        });
      } else if (sort === "NUM-OF-INGREDIENTS") {
        sortedCookBook.sort((a: any, b: any) => {
          return a.extendedIngredients.length - b.extendedIngredients.length;
        });
      } else {
        sortedCookBook = cookbook;
      }
      setLastSort(sort);
    }

    if (filters.length > 0) {
      sortedCookBook = sortedCookBook.filter((recipe: any) => {
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

    // narrow by search from the filtered list
    const filteredCookBook = [...sortedCookBook];
    if (search !== "") {
      sortedCookBook = filteredCookBook.filter((recipe: any) => {
        return recipe.title.toLowerCase().includes(search.toLowerCase());
      });
    }

    setCookbookState(sortedCookBook);
  }, [sort, search, filters]);




  return (
    <div className='cookbook-container'>
      <div className='col-3 d-flex'>
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

      <div className='col-9 cookbook-container d-flex border'>
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
  )
}

export default CookBookContainer