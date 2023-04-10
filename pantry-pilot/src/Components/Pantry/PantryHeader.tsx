import React, { useState, useEffect, useRef } from 'react'

//Emmiter Imports


// GroceryBag Component imports
import GroceryBag from '../GroceryBag/GroceryBag';

//TotalStockStats Component imports


// Structural Component imports
import IconSelectMenu from '../Structural/IconSelectMenu';
import { Events, eventEmitter } from '../Structural/Emitter';

//Component Imports
import SearchBar from '../Structural/SearchBar';

//Bootstrap Imports
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

//Icon Imports
import { FaPlus } from 'react-icons/fa'

type PantyHeaderProps = {
  pantry: any,
  setPantry: React.Dispatch<React.SetStateAction<any>>,
  viewType: string,
  setViewType: React.Dispatch<React.SetStateAction<string>>,
  categorySort: boolean,
  setCategorySort: React.Dispatch<React.SetStateAction<boolean>>
  sortType: string,
  setSortType: React.Dispatch<React.SetStateAction<string>>,
  tsStats: any;
}


function PantryHeader({ pantry, setPantry, viewType, setViewType, categorySort, setCategorySort, sortType, setSortType, tsStats }: PantyHeaderProps) {
  const [show, setShow] = useState(false);
  const [length, setLength] = useState(-1);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // console.log("search:", search)
    eventEmitter.dispatch("search", search);
  }, [search]);


  const today = new Date();

  const handleViewTypeChange = () => {
    setViewType(viewType === "grid" ? "list" : "grid")
    // eventEmitter.dispatch("changeViewType", (viewType === "grid" ? "list" : "grid"))
  }


  return (
    <div className="pantry-header col-12">
      <div className='pantry-subheader'>
        <h2>My Pantry:</h2>
        <div>Today's Date: {today.toISOString().substring(0, 10)}</div>
        <div>Number of Food Items: {pantry[0]?.fridge?.length ?? 0} </div>
        <button className='btn btn-primary' onClick={handleShow}><FaPlus /> Add Food</button>
        <GroceryBag show={show} handleClose={handleClose} handleShow={handleShow} pantry={pantry} setPantry={setPantry} />
      </div>
      <div className='pantry-header-body '>
        <div className='pantry-header-body-item'>
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <Form>
          <Form.Check
            type="switch"
            id="View-switch"
            label={viewType === "grid" ? "Grid View" : "List View"}
            className='pantry-header-body-item'
            onChange={handleViewTypeChange}
          />
          <Form.Check
            type="switch"
            id="Category-switch-"
            label={categorySort === true ? "Catgories on" : "Catgories off"}
            className='pantry-header-body-item'
            onChange={() => { setCategorySort(!categorySort) }}
          />
        </Form>
        <Form className=''>
          <Form.Group as={Row}>
            <Form.Label column sm="4" >Sort By:</Form.Label>
            <div className='col-8'>
              <Form.Select aria-label="Default select example" onChange={(change) => { setSortType(change.target.value); }}>
                <option value="NONE">None</option>
                <option value="EXP-DATE-SORT" >Expiration Date</option>
                <option value="NAME-SORT">Name</option>
                <option value="QUANTITY-SORT">Quantity</option>
              </Form.Select>
            </div>
          </Form.Group>

        </Form>

      </div>

    </div>
  )
}

export default PantryHeader