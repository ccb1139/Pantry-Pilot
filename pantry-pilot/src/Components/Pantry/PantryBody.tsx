import React, { useState, useEffect } from 'react'

//Component Imports
import PantryTile from './PantryTile'
import PantryList from './PantryList'
import PantryDynamicShelves from './PantryDynamicShelves'

//Emmiter Imports
import { Events, eventEmitter } from '../Structural/Emitter';

// Recipe Pot Imports
import RecipePot from '../Recipes/Preview/RecipePot';

// Bootstrap Imports
import Collapse from 'react-bootstrap/Collapse';

// Draggable Imports
import { useDrop } from 'react-dnd'
import { useDrag } from 'react-dnd'

//Api Imports
import {
  updateFridge,
  getCategoryEmojiByName,
  removeFromPantry,
  changeNameInPantry,
  sendPantryToServer
} from '../FoodStockHelpers/pantryAPI';
import {
  addToSelectedIngredients,
  removeFromSelectedIngredients
} from '../FoodStockHelpers/selectedIngredients';

type PantryBodyProps = {
  pantry: any,
  setPantry: React.Dispatch<React.SetStateAction<any>>,
  viewType: string,
  categorySort: boolean,
  sortType: string,
  stats: any
}

function PantryBody({ pantry, setPantry, viewType, categorySort, sortType, stats }: PantryBodyProps) {
  // const [_viewType, setViewType] = useState<string>(viewType);
  const [showCreateRecipe, setShowCreateRecipe] = useState<boolean>(false);

  const [selectedIngredients, setSelectedIngredients] = useState<any[]>([]);
  
  const [newRemovedFood, setNewRemovedFood] = useState<any>([])
  const [newRemovedFoodForComponent, setNewRemovedFoodForComponent] = useState<any>([])
  const [newAddedFoodForComponent, setNewAddedFoodForComponent] = useState<any>([])
  const [classNameForAnimation, setClassNameForAnimation] = useState<string>(showCreateRecipe ? 'col-9 shrink ' : 'col-12')

  eventEmitter.subscribe("CREATE-RECP", (data: string) => { setShowCreateRecipe(!showCreateRecipe) });

  useEffect(() => {
    // setClassNameForAnimation(showCreateRecipe ? 'col-9 shrink ' : 'col-12')
    if(showCreateRecipe){
      setClassNameForAnimation('shrink-anim col-9 ')
      // setClassNameForAnimation('col-9 ')
      setTimeout(() => {setClassNameForAnimation('col-9 ')}, 200)
    } else {
      setClassNameForAnimation('col-12')
    }
  }, [showCreateRecipe])

  useEffect(() => {

    let newSelectedIngredients = [...selectedIngredients]
    for (let i = 0; i < newSelectedIngredients.length; i++) {
      if (newSelectedIngredients[i]?._id === newRemovedFood._id) {

        setNewRemovedFoodForComponent(newRemovedFood)
        newSelectedIngredients.splice(i, 1)
        setSelectedIngredients(newSelectedIngredients)
        return
      }
    }
  }, [newRemovedFood])

  useEffect(() => {

    // let newSelectedIngredients = [...selectedIngredients]

  }, [newAddedFoodForComponent])

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'BOX',
    // Props to collect
    drop: (item, monitor) => {
      setNewRemovedFood(monitor.getItem());

    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  // Function to handle the click of a tile
  // Pass in the type and the nessicary information to the parent component
  function handleTileClick(type: string, subType: string, category: string, foodName: string | Date, expirationDate: string | Date, emoji: string, _id: string) {
    let newPantry;
    // console.log(type, category, foodName, expirationDate, emoji, _id);
    if (type === "remove") {
      removeFromPantry(foodName, category, expirationDate, pantry, setPantry).then((res: object) => {
        newPantry = res;
        sendPantryToServer(newPantry, pantry, setPantry);
      }).catch((err: any) => { console.log(err) })
    } else if (type === "edit") {
      console.log("edit", subType, category, foodName, expirationDate, emoji, _id);
      if (subType === "name") {
        console.log("Changing name");
        changeNameInPantry(foodName, category, expirationDate, _id, pantry, setPantry).then((res: object) => {
          newPantry = res;
          sendPantryToServer(newPantry, pantry, setPantry);
        }).catch((err: any) => { console.log(err) })
      } else if (subType === "date") {
        updateFridge(foodName, category, expirationDate, _id, pantry, setPantry).then((res: object) => {
          newPantry = res;
          sendPantryToServer(newPantry, pantry, setPantry);
        }).catch((err: any) => { console.log(err) })
      }
    }
  }

  return (
    <div className='row h-100'>
      <div ref={drop} className={classNameForAnimation}>
        <PantryDynamicShelves
          pantry={pantry}
          setPantry={setPantry}
          viewType={viewType}
          handleTileClick={handleTileClick}
          categorySort={categorySort}
          sortType={sortType}
          stats={stats}
          newRemovedFoodForComponent={newRemovedFoodForComponent}
          newAddedFoodForComponent={newAddedFoodForComponent}
          />

      </div>
      <div className='col-3'>
        {/* <Collapse in={showCreateRecipe} dimension="width">
          <div id="example-collapse-text">
            <RecipePot
              pantry={pantry}
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
            />
          </div>
        </Collapse> */}
        { showCreateRecipe ? 
        <RecipePot
          pantry={pantry}
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
          setNewAddedFoodForComponent={setNewAddedFoodForComponent}
        /> : null}
      </div>
    </div>

  )
}

export default PantryBody
