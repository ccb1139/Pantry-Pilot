import React, { useState, useEffect, useRef } from 'react'

//Grocery Bag Imports
import GroceryBagCategory from './GroceryBagCategory'
import SelectedCategory from './SelectedCategory';

// Bootstrap Imports
// import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/esm/Overlay';

//Api Imports
import { addToPantry, addCategory, addFoodToCategory, updateCategory, removeFoodFromCategory, sendPantryToServer } from '../FoodStockHelpers/pantryAPI';

//Icon imports 
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineClose } from 'react-icons/ai'

//CSS Imports
import '../../css/GroceryBag.css'


/*
==============================
FEATURES TO IMPLEMENT LATER:
- These require new API functions so they will be implemented later
- Edit Category Name
- Edit Food Name
- Delete Category

==============================
*/


function GroceryBag({ pantry, setPantry, show, handleClose, handleShow }) {
  // Selected Holds foodNames, Category, and ExpirationDate
  const [selected, setSelected] = useState([])
  const [openNewCatInput, setOpenNewCatInput] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState([]);
  const newCatInputRef = useRef(null);

  useEffect(() => {
    console.log(pantry)
  }, [pantry])

  //Function adds a new category to the pantry
  async function handleAddNewCategory() {
    console.log(newCatInputRef.current.value);
    // Gaurd Conditions for adding category
    var tmpAlrtMSG = [];
    if (newCatInputRef.current.value === "") {
      tmpAlrtMSG.push("Please enter a category name");
    }
    if (pantry[0].categories.find((cat) => cat.categoryName.trim().toLowerCase() === newCatInputRef.current.value.trim().toLowerCase())) {
      tmpAlrtMSG.push("Category already exists");
    }

    if (tmpAlrtMSG.length > 0) {
      setAlertMsg(tmpAlrtMSG);
      setShowAlert(true);
      return;
    } else {
      setAlertMsg([]);
      setShowAlert(false);
    }

    let newPantry;
    await addCategory(newCatInputRef.current.value, [], pantry, setPantry).then((res) => {
      newPantry = res;
    }).catch((err) => { console.log(err) })
    sendPantryToServer(newPantry, pantry, setPantry);
    newCatInputRef.current.value = "";
    setOpenNewCatInput(false);
  }

  // Function adds a new food to a category
  async function handleNewFoodToCategory(foodName, _id) {
    console.log(foodName);
    let newPantry;
    await addFoodToCategory(_id, foodName, pantry, setPantry).then((res) => {
      newPantry = res;
    }).catch((err) => { console.log(err) })
    sendPantryToServer(newPantry, pantry, setPantry);
  }

  // Function removes a food from a category
  async function handleRemoveFoodFromCategory(_id, foodName) {
    console.log(_id, foodName);
    let newPantry;
    await removeFoodFromCategory(_id, foodName, pantry, setPantry).then((res) => {
      newPantry = res;
    }
    ).catch((err) => { console.log(err) })
    console.log(newPantry);
    sendPantryToServer(newPantry, pantry, setPantry);
    
  }

  async function handleEditTileName(_id, categoryName, foodNames){
    console.log(_id, categoryName, foodNames);
    let newPantry;
    await updateCategory(_id, categoryName, foodNames, pantry, setPantry).then((res) => {
      newPantry = res;
    }).catch((err) => {console.log(err)})
    console.log(newPantry);
    sendPantryToServer(newPantry, pantry, setPantry);
  }

  // Function edits a category name
  // STRETCH GOAL, HAVE TO REFACTOR BACKEND TO IMPLEMENT THIS

  // async function handleEditCategoryName(_id, categoryName, foodNames) {
  //   console.log(_id, categoryName, foodNames);
  //   let newPantry;
  //   await updateCategory(_id, categoryName, foodNames, pantry, setPantry).then((res) => {
  //     newPantry = res;
  //   }
  //   ).catch((err) => { console.log(err) })
  //   console.log(newPantry);
  //   sendPantryToServer(newPantry, pantry, setPantry);
  // }

  //Function adds the selected foods to the pantry
  async function addSelectedFoodsToPantry() {
    let newPantry = pantry[0];
    for (let i = 0; i < selected.length; i++) {
      await addToPantry(selected[i].foodName, selected[i].categoryName, selected[i].expirationDate, [newPantry], setPantry)
        .then((res) => {
          // console.log(res)
          newPantry = res;
        })
        .catch((err) => {
          console.log(err)
        })
    }
    console.log(newPantry);
    sendPantryToServer(newPantry, pantry, setPantry);
    setSelected([]);
    handleClose();
  }

  return (
    <>
      <Modal
        className={"modal-90w"}
        open={show}
        onClose={handleClose}
        center
        closeOnOverlayClick={false}>
        <div className='Grocery-Bag-Header'>
          <h2>Add foods to your pantry</h2>
          <div className='add-cat d-inline-flex align-items-center'>
            {openNewCatInput ?
              <AiOutlineMinusCircle onClick={() => setOpenNewCatInput(!openNewCatInput)} size={20} />
              : <AiOutlinePlusCircle onClick={() => setOpenNewCatInput(!openNewCatInput)} size={20} />}
            <div>
              <Collapse in={openNewCatInput} dimension="width">
                <div>
                  <div className='d-inline-flex mx-2'>
                    <input type="text" placeholder="Category Name" ref={newCatInputRef} />
                    <Overlay show={showAlert} target={newCatInputRef.current} placement="bottom">
                      <Popover id="add-category-alert" >
                        <Popover.Body className='d-flex align-items-center'>
                          {alertMsg.map((msg) => (
                            <div>{msg}</div>
                          ))}
                          <div className="ms-2">
                            <AiOutlineClose onClick={() => setShowAlert(false)} size={15} />
                          </div>

                        </Popover.Body>
                      </Popover>
                    </Overlay>
                    <Button variant="primary" onClick={handleAddNewCategory} size="sm">+</Button>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        </div>


        <div className='Grocery-Bag-Body'>
          {pantry[0].categories?.map((category) => (
            <GroceryBagCategory
              categoryName={category.categoryName}
              foodNames={category.foodNames}
              _id={category._id}
              key={category._id}
              selected={selected}
              setSelected={setSelected}
              addNewFoodFunc={handleNewFoodToCategory}
              removeFoodFunc={handleRemoveFoodFromCategory}
              // editCatNameFunc={handleEditCategoryName}
              editTileNameFunc={handleEditTileName}
            />
          ))}
          <SelectedCategory
            categoryName={"Selected"}
            foodNames={selected}
            setSelected={setSelected}
          />
        </div>


        <div className='Grocery-Bag-Footer'>
          <Button variant="primary" onClick={addSelectedFoodsToPantry}>
            Add Foods
          </Button>
          <Button variant="primary" onClick={() => console.log(selected)}>
            Log Selected
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default GroceryBag