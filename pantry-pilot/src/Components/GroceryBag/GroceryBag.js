import React, { useState, useEffect } from 'react'

//Grocery Bag Imports
import GroceryBagCategory from './GroceryBagCategory'
import SelectedCategory from './SelectedCategory';

// Bootstrap Imports
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function GroceryBag({ pantry, setPantry, show, handleClose, handleShow }) {
  const [selected, setSelected] = useState([])


  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        fullscreen="lg-down"
        dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pantry[0].categories?.map((category) => (
            <GroceryBagCategory
              categoryName={category.categoryName}
              foodNames={category.foodNames}
              _id={category._id}
              key={category._id}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
          <SelectedCategory
           categoryName={"Selected"}
           foodNames={selected}
           setSelected={setSelected}
           />        
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default GroceryBag