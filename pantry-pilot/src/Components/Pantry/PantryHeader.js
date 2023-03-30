import React, {useState, useEffect, useRef} from 'react'
import {FaPlus} from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal';

// GroceryBag Component imports
import GroceryBag from '../GroceryBag/GroceryBag';

// Structural Component imports
import IconSelectMenu from '../Structural/IconSelectMenu';

function PantryHeader({ pantry, setPantry }) {
  const [show, setShow] = useState(false);
  const [length, setLength] = useState(-1);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  


  const today = new Date();


  return (
    <div className="col-12 d-flex">
      <div className='col-6'>
        <h2>My Fridge</h2>
        <div>Today's Date: {today.toISOString().substring(0, 10)}</div>
        <div>Number of Food Items: {pantry[0].fridge.length} </div>
      </div>
      <div className='col-6 d-flex justify-content-end align-items-center'>
        <button className='btn btn-primary' onClick={handleShow}><FaPlus /> Add Food</button>
        <GroceryBag show={show} handleClose={handleClose} handleShow={handleShow} pantry={pantry} setPantry={setPantry}/>
        {/* <IconSelectMenu ButtonText={"IconSelectMenuTest"} ></IconSelectMenu> */}
      </div>
    </div>
  )
}

export default PantryHeader