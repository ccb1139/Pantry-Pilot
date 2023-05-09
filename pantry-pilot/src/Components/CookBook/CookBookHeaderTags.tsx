import React, { useState, useRef, useEffect } from 'react'

//Icon Imports
import { BiMoney, BiRecycle } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import gluten_free from '../../img/DietIcons/gluten-free.png'
import dairy_free from '../../img/DietIcons/dairy-free.png'
import _vegetarian from '../../img/DietIcons/meat-free.png'
import _vegan from '../../img/DietIcons/leaf.png'
import _pescetarian from '../../img/DietIcons/fish.png'

//Bootstrap Imports
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Form from 'react-bootstrap/Form';

type Props = {
    filters: any,
    setFilters: any,
}

function CookBookHeaderTags({ filters, setFilters }: Props) {
    const [icons, setIcons] = useState<any>(["gluten free", "dairy free", "vegetarian", "vegan", "cheap", "sustainable", "very healthy"])
    const tagFromRef = useRef<any>(null)

    const iconSize = "20px"
    const dietIcons: any = {
        "gluten free": gluten_free,
        "dairy free": dairy_free,
        "vegetarian": _vegetarian,
        "vegan": _vegan,
    }
    const tagIcons: any = {
        "cheap": (<BiMoney size={iconSize} />),
        "sustainable": (<BiRecycle size={iconSize} />),
        "very healthy": (<AiOutlineHeart size={iconSize} />),
    }


    const tagIcon = (diet: any) => {
        // console.log(diet)
        // console.log(tagIcons)

        if (diet in dietIcons) {
            return (
                <div className='d-flex' style={{ height: iconSize, width: iconSize }}>
                    <Image fluid src={dietIcons[diet]} />
                </div>

            )
        } else if (diet in tagIcons) {
            return (tagIcons[diet])
        }

    }

    function handleCheck(e: any) {
        // console.log(e.target.name)
        // console.log(e.target.checked)
        if (e.target.checked) {
            setFilters([...filters, e.target.name])
        } else {
            setFilters(filters.filter((filter: any) => filter !== e.target.name))
        }
    }

    function clearCheckboxes(e: any) {
        e.preventDefault()
        // console.log(tagFromRef.current)
        // tagFromRef.current.reset()
        tagFromRef?.current?.querySelectorAll('input[type=checkbox]:checked')?.forEach((checkbox: any) => {
            checkbox.checked = false
        })
        setFilters([])
    }


    return (
        <Form ref={tagFromRef} onChange={(e) => { handleCheck(e) }}>

            {icons.map((diet: any) => {
                return (

                    <div className='d-inline-flex justify-content-center align-items-center px-2 py-1' key={diet}>
                        <Form.Check
                            type="checkbox"
                            name={diet}
                            label={""}
                        />
                        <OverlayTrigger

                            placement="bottom"

                            overlay={
                                <Tooltip id={`tooltip-${diet}`}>
                                    {diet}
                                </Tooltip>
                            }
                        >
                            <span className="d-inline-flex">
                                {tagIcon(diet)}
                            </span>
                        </OverlayTrigger>
                    </div>


                )
            })}

            {
                tagFromRef?.current?.querySelectorAll('input[type=checkbox]:checked')?.length > 0 ?
                    (<div className='cookbook-header-clear-btn' onClick={(e) => { 
                        clearCheckboxes(e);
                        // const checkedInputs = tagFromRef.current.querySelectorAll('input[type=checkbox]:checked');
                        // console.log(checkedInputs[0].name);
                    }}>Clear</div>)
                    :
                    (null)
            }
        </Form>
    )


}

export default CookBookHeaderTags