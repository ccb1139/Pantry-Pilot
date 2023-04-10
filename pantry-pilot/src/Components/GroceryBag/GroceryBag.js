import React, { useState, useEffect, useRef } from 'react'

//Grocery Bag Imports
import GroceryBagCategory from './GroceryBagCategory'
import SelectedCategory from './SelectedCategory';
import GroceryBagSearchResults from './GroceryBagFullView';

//Structural Imports
import SearchBar from '../Structural/SearchBar';

// Bootstrap Imports
// import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/esm/Overlay';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';

//Api Imports
import { addToPantry, addCategory, addFoodToCategory, removeCategory, updateCategoryEmoji, updateCategory, removeFoodFromCategory, sendPantryToServer } from '../FoodStockHelpers/pantryAPI';

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
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedView, setSelectedView] = useState(1); //1 For categories, 2 for all
  const newCatInputRef = useRef(null);


  useEffect(() => {
    let tmpArr = []

    for (let foodItm of searchResults) {
      // console.log(foodItm)
      let showInSearchTmp = false;
      // console.log(search)
      if ((foodItm.foodName).toLowerCase().trim().includes(search)
        || (foodItm.foodName).includes(search)) {
        // console.log(foodItm)

        showInSearchTmp = true;
      }
      tmpArr.push(
        {
          showInSearch: showInSearchTmp,
          foodName: foodItm.foodName,
          categoryName: foodItm.categoryName,
          expirationDate: foodItm.expirationDate,
        }
      )
    }

    setSearchResults(tmpArr);
  }, [search])

  // Set up an array of all the food names in the pantry for the search results
  useEffect(() => {
    if (pantry[0].categories[0]._id === "ct") { return; }

    let tmpSearchResults = [];
    for (let pantryCat of pantry[0].categories) {
      for (let food of pantryCat.foodNames) {
        tmpSearchResults.push({ showInSearch: false, foodName: food, categoryName: pantryCat.categoryName, expirationDate: (new Date()) });
      }
    }

    setSearchResults(tmpSearchResults);
  }, [pantry])


  //Function adds a new category to the pantry
  async function handleAddNewCategory(event) {
    event.preventDefault();
    // console.log(newCatInputRef.current.value);
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

  // Function handles the edit of a food name
  async function handleEditTileName(_id, categoryName, foodNames) {
    // console.log(_id, categoryName, foodNames);
    let newPantry;
    await updateCategory(_id, categoryName, foodNames, pantry, setPantry).then((res) => {
      newPantry = res;
    }).catch((err) => { console.log(err) })
    sendPantryToServer(newPantry, pantry, setPantry);
  }

  // Function removes a category
  async function handleRemoveCategory(_id) {
    console.log(_id);
    let newPantry;
    await removeCategory(_id, pantry, setPantry).then((res) => {
      newPantry = res;
    }).catch((err) => { console.log(err) })
    sendPantryToServer(newPantry, pantry, setPantry);
  }

  async function handleUpdateEmoji(_id, emoji) {
    let newPantry;
    await updateCategoryEmoji(_id, emoji, pantry, setPantry).then((res) => {
      newPantry = res;
    }).catch((err) => { console.log(err) })
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
    // console.log(newPantry);
    sendPantryToServer(newPantry, pantry, setPantry);
    setSelected([]);
    handleClose();
  }

  //SORTING & VIEW STUFF
  //For dropdown Label
  const dropDownLabel = () => {
    if (selectedView === 1) {
      return "Categories"
    } else if (selectedView === 2) {
      return "All"
    }
  }

  return (
    <>
      <Modal
        className={"modal-90w app-font "}
        open={show}
        onClose={handleClose}
        center
        closeOnOverlayClick={false}>
        <div className='Grocery-Bag-Header app-font '>
          <h2>Add foods to your pantry</h2>
          <div className='Grocery-Bag-SubHeader col-12 d-flex my-2'>
            <div className="col-auto d-inline-flex align-items-center">
              {/* <Dropdown title="ViewSelection" variant="primary" id="dropdown-split-basic" className="mx-2">
                <Dropdown.Toggle variant="primary" size="sm" id="dropdown-basic">
                  {dropDownLabel()}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as="button" onClick={() => setSelectedView(1)}>Categories</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={() => setSelectedView(2)}>All</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
              {(search !== "") ?
                <GroceryBagSearchResults SearchArray={searchResults} search={search} selected={selected} setSelected={setSelected} />
                : null}
            </div>
            <div className='col-auto ms-auto'>
              <SearchBar search={search} setSearch={setSearch} />
            </div>
          </div>
        </div>


        <div className='Grocery-Bag-Body'>
          {/* {
            (searchResults.length > 0 && search !== "") &&

          } */}

          {pantry[0].categories?.map((category) => (
            <GroceryBagCategory
              categoryName={category.categoryName}
              foodNames={category.foodNames}
              _id={category._id}
              key={category._id + category.categoryName}
              emoji={category.unifiedEmoji}
              selected={selected}
              setSelected={setSelected}
              addNewFoodFunc={handleNewFoodToCategory}
              removeFoodFunc={handleRemoveFoodFromCategory}
              // editCatNameFunc={handleEditCategoryName}
              editTileNameFunc={handleEditTileName}
              removeCatFunc={handleRemoveCategory}
              updateEmojiFunc={handleUpdateEmoji}
            />
          ))}


          <SelectedCategory
            categoryName={"Selected"}
            foodNames={selected}
            setSelected={setSelected}
          />
          <div className='d-flex border'>
            <Button variant="primary" className='d-block' style={{ width: "100% " }} onClick={addSelectedFoodsToPantry}>
              Add Foods
            </Button>
          </div>

        </div>


        <div className='Grocery-Bag-Footer'>

          <div className='add-cat col-auto d-inline-flex align-items-center'>
            <span className='me-2'>Add a category </span>
            {openNewCatInput ?
              <AiOutlineMinusCircle onClick={() => setOpenNewCatInput(!openNewCatInput)} size={20} />
              : <AiOutlinePlusCircle onClick={() => setOpenNewCatInput(!openNewCatInput)} size={20} />}
            <div>
              <Collapse in={openNewCatInput} dimension="width">
                <div>
                  <div className='d-inline-flex mx-2'>
                    <form onSubmit={handleAddNewCategory} className="d-inline-flex">
                      <input type="text" placeholder="Category Name" ref={newCatInputRef} />
                      <Button type="submit" variant="primary" size="sm">+</Button>
                    </form>
                    {/* <input type="text" placeholder="Category Name" ref={newCatInputRef} /> */}
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

                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default GroceryBag