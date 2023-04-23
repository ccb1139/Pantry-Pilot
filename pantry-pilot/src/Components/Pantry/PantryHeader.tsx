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
import { FaPlus, } from 'react-icons/fa';
import { AiOutlinePlusCircle } from 'react-icons/ai';

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
    <div className="pantry-header">
      <div className='pantry-subheader'>
        {/* <div className='d-flex justify-content-center'>
          <h2 className=''>My Pantry</h2>
        </div> */}
        <div className='row'>
          {/* <div className='col-auto'>
            <div>{today.toISOString().substring(0, 10)}</div>
            <div>Near Expiring Count: {tsStats?.totalCloseToExpiring} </div>
          </div> */}
          <div className='col-10 me-auto'>
            <div onClick={handleShow} className='grocery-bag-btn d-flex align-items-center justify-content-center py-2 px-1 ph-btn-hover-anim'>
              <span>Add Groceries</span>
              <FaPlus className='ms-2' size={20} />
            </div>

          </div>
          <div className='col-10 me-auto'>
            <div onClick={() => {eventEmitter.dispatch("CREATE-RECP", "")}} className='grocery-bag-btn d-flex align-items-center justify-content-center py-2 px-1 ph-btn-hover-anim '>
              <span>Get Recpies</span>
              <FaPlus className='ms-2' size={20} />
            </div>

          </div>
        </div>



        <GroceryBag show={show} handleClose={handleClose} handleShow={handleShow} pantry={pantry} setPantry={setPantry} />
      </div>
      <div className='pantry-header-body '>
        <div className='pantry-header-body-item'>
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <Form className='pantry-header-body-item'>
          <Form.Group as={Row}>
            <div className='col-auto'>
              <Form.Select aria-label="Default select example" onChange={(change) => { setSortType(change.target.value); }}>
                <option value="NONE">Sort by</option>
                <option value="EXP-DATE-SORT" >Expiration Date</option>
                <option value="NAME-SORT">Name</option>
                <option value="QUANTITY-SORT">Quantity</option>
              </Form.Select>
            </div>
          </Form.Group>

        </Form>
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
            label={categorySort === true ? "Categories on" : "Categories off"}
            className='pantry-header-body-item'
            onChange={() => { setCategorySort(!categorySort) }}
          />
        </Form>


      </div>

    </div>
  )
}

export default PantryHeader