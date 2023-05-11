import React, { useState, useEffect, useRef } from 'react'
import Collapse from 'react-bootstrap/Collapse';

import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai'


type collapserProps = {
    label: string,
    children: any,
}

function Collapser({ label, children }: collapserProps) {
    const [open, setOpen] = useState(false);


    return (
        <div className='collapser-container '>
            <div className={'collapser-header ' + (open? 'btm-border' : '')} onClick={() => { setOpen(!open) }}>
                <span className='collapser-header-item me-auto'>{label}</span>
                <span className='collapser-header-item ms-auto'>{open ? <AiOutlineDown /> : <AiOutlineUp />}</span>

            </div>
            <Collapse in={open} className='collapser-content'>
                <div className="collapser-content-body">
                    {children}
                </div>

            </Collapse>

        </div>

    )
}

export default Collapser