import React, { useState, useEffect, forwardRef } from 'react'

//Bootstrap Imports
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-responsive-modal';

//Icon Imports 
import { AiOutlineEllipsis } from 'react-icons/ai'

type PantryItemMenuProps = {
    foodName: string,
    handleEdit: () => void,
    handleRemove: () => void,
}

function PantryItemOptionsMenu({foodName, handleEdit, handleRemove }: PantryItemMenuProps) {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    type EditFoodDropDownToggleProps = {
        children: React.ReactNode,
        onClick: (event: React.MouseEvent<HTMLDivElement>) => void
    }

    const EditFoodDropDownToggle = forwardRef<HTMLDivElement, EditFoodDropDownToggleProps>(({ children, onClick }, ref) => (
        <div
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className='pantry-tile-header-dropdown'
        >
            {children}
            {/* &#x25bc; */}
        </div>
    ));

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle
                    as={EditFoodDropDownToggle}
                    id="dropdown-custom-components"
                    // align="start"

                >
                    <AiOutlineEllipsis size={20} />
                </Dropdown.Toggle>

                <Dropdown.Menu
                    align={"end"}>
                    <Dropdown.Item
                        as="button"
                        onClick={handleEdit}>
                        Edit Food
                    </Dropdown.Item>
                    <Dropdown.Item
                        as="button"
                        onClick={() => {setShowConfirmDelete(true)}}>
                        Remove Food
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Modal open={showConfirmDelete} onClose={() => setShowConfirmDelete(!showConfirmDelete)} center>
                <div className='d-flex flex-column'>
                    <div className='col-12 text-center'>
                        <h3>Are you sure you want to delete this {foodName} from your pantry?</h3>
                    </div>
                    <div className='col-12 d-flex justify-content-center'>
                        <Button className='mx-2 mt-2' variant="danger" onClick={handleRemove}>Delete</Button>
                        <Button className='mx-2 mt-2' variant="secondary" onClick={() => setShowConfirmDelete(!showConfirmDelete)}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default PantryItemOptionsMenu