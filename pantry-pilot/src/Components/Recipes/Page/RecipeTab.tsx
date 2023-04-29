import React from 'react'

//Bootstrap Imports
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//Icon Imports
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BiMoney, BiRecycle } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import gluten_free from '../../../img/DietIcons/gluten-free.png'
import dairy_free from '../../../img/DietIcons/dairy-free.png'
import _vegetarian from '../../../img/DietIcons/meat-free.png'
import _vegan from '../../../img/DietIcons/leaf.png'
import _pescetarian from '../../../img/DietIcons/fish.png'

type Props = {
    tabData: any,
}

function RecipeTab({ tabData }: Props) {
    const { title, dietTags, nutritionInfo, missedIngredients } = tabData

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
            return (<Image fluid src={dietIcons[diet]} />)
        } else if (diet in tagIcons) {
            return (tagIcons[diet])
        }

    }

    return (
        <div className='d-flex flex-column'>
            <div className='d-flex' >{title}</div>
            <div className='d-flex align-items-center'>
                <div className='d-flex align-items-center'>
                    {dietTags?.map((diet: any, index: number) => (
                        <OverlayTrigger
                            placement='right'
                            delay={{ show: 150, hide: 100 }}
                            overlay={<Tooltip id="button-tooltip" >{diet}</Tooltip>}
                        >
                            <div className='recipe-card-diet-icon mx-1' style={{ height: iconSize, width: iconSize }}>
                                {tagIcon(diet)}
                            </div>
                        </OverlayTrigger>
                    ))}

                </div>
                <div className='d-flex align-items-center ms-auto'>
                    <OverlayTrigger
                        placement='right'
                        delay={{ show: 150, hide: 100 }}
                        overlay={<Tooltip id="button-tooltip" >{missedIngredients.length} foods not in your pantry </Tooltip>}
                    >
                        <span>
                            {missedIngredients.length} <AiOutlineShoppingCart size={iconSize} />
                        </span>

                    </OverlayTrigger>
                </div>
            </div>

        </div>
    )
}

export default RecipeTab