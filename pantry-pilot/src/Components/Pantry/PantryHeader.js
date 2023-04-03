import React, { useState, useEffect, useRef } from 'react'


// GroceryBag Component imports
import GroceryBag from '../GroceryBag/GroceryBag';

// Structural Component imports
import IconSelectMenu from '../Structural/IconSelectMenu';

//Bootstrap Imports
import Form from 'react-bootstrap/Form';

//Icon Imports
import { FaPlus } from 'react-icons/fa'

function PantryHeader({ pantry, setPantry, viewType, setViewType, categorySort, setCategorySort }) {
  const [show, setShow] = useState(false);
  const [length, setLength] = useState(-1);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const today = new Date();

  const handleViewTypeChange = (e) => {
    setViewType(viewType === "grid" ? "list" : "grid")
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
        <Form>
          <Form.Check
            type="switch"
            id="View-switch"
            label={viewType === "grid" ? "Grid View" : "List View"}
            onChange={handleViewTypeChange}
          />
          <Form.Check
            type="switch"
            id="Category-switch-"
            label={categorySort === false ? "Catgories on" : "Catgories off"}
            onChange={() => { setCategorySort(!categorySort) }}
          />
        </Form>
 
      </div>
    </div>
  )
}

export default PantryHeader