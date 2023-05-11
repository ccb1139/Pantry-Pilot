import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";

//Icon Imports
import { BiArrowBack } from 'react-icons/bi'

//Css Imports
import '../../css/Structrual.css'


type Props = {
    show: boolean,
    path: string,
}

function PageBackButton({ show, path}: Props) {
    let navigate = useNavigate();
    return (
        <button className={'page-back-btn ' + (show? "" : "invisible ")} onClick={() => { navigate(path); }}>
            <BiArrowBack size={"20px"} />
            <span className='mx-1'> Back</span>
        </button>
    )
}

export default PageBackButton