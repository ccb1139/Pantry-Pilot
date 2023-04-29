import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

//Bootstrap imports
import Image from 'react-bootstrap/Image'

//Icon Imports
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'


type Props = {
    equipmentUsed: any,
}

function EquipmentContainer({ equipmentUsed }: Props) {
    const equipmentTileRef = useRef<any>(null)
    const [statusLeft, setStatusLeft] = useState<string>('disabled')
    const [statusRight, setStatusRight] = useState<string>('disabled')

    useEffect(() => {
        if (equipmentTileRef.current) {
            // console.log(equipmentUsed)
            // console.log("clientWidth", equipmentTileRef.current.clientWidth)
            // console.log("scrollWidth", equipmentTileRef.current.scrollWidth)
            // console.log("scrollLeft", equipmentTileRef.current.scrollLeft)
            setStatus();
        }
    }, [equipmentTileRef.current?.clientWidth, equipmentTileRef.current?.scrollWidth, equipmentTileRef.current?.scrollLeft])
    // useLayoutEffect(() => {
    //     console.log(equipmentTileRef)
    //     console.log("clientWidth", equipmentTileRef.current.clientWidth)
    //     console.log("scrollWidth", equipmentTileRef.current.scrollWidth)
    //     console.log("scrollLeft", equipmentTileRef.current.scrollLeft)
    // }, [])

    function setStatus() {
        const { clientWidth, scrollWidth, scrollLeft } = equipmentTileRef.current;
        setStatusLeft(scrollLeft > 0 ? '' : 'disabled');
        setStatusRight(scrollLeft + clientWidth < scrollWidth ? '' : 'disabled');

    }


    const equipmentTile = (equipment: any, index: number) => (
        <div className='recipe-card-equiment-tile border' key={index}>
            <div>
                <Image
                    src={"https://spoonacular.com/cdn/equipment_250x250/" + equipment.image}
                    className='recipe-card-equipment-img'
                    rounded
                />
            </div>

            <div className='recipe-card-equiment-tile-name'>{equipment.name}</div>
        </div>
    )
    let intervalId: any;
    // function scrollEquipment(direction: string, action: string) {
    //     const { scrollTop } = equipmentTileRef.current;
    //     setStatus();
    
    //     let requestId: number;
    
    //     if (action === 'start') {
    //         const scrollStep = direction === 'left' ? -40 : 40;
    
    //         const step = () => {
    //             equipmentTileRef.current.scrollBy({
    //                 top: 0,
    //                 left: scrollStep,
    //                 behavior: 'smooth'
    //             });
    
    //             requestId = requestAnimationFrame(step);
    //         };
    
    //         step();
    //     } else if (action === 'stop') {
    //         cancelAnimationFrame(requestId);
    //     }
    // }
    function scrollEquipment(direction: string, action: string) {
        const { scrollTop } = equipmentTileRef.current;
        setStatus();

        if (action === 'start') {
            intervalId = setInterval(() => {
                if (direction === 'left') {
                    equipmentTileRef.current.scrollBy({
                        top: 0,
                        left: -40,
                        behavior: 'smooth'
                    });
                } else if (direction === 'right') {
                    equipmentTileRef.current.scrollBy({
                        top: 0,
                        left: 40,
                        behavior: 'smooth'
                    });
                }
            }, 80); // adjust this interval as needed
        } else if (action === 'stop') {
            clearInterval(intervalId);
        }
    }

    return (
        < div className='col-12 d-flex align-items-center justify-content-center recipe-card-equipment-container' >
            <div>
                <AiOutlineLeft
                    size={30}
                    className={'h-100 border ' + statusLeft}
                    // onClick={() => scrollEquipment('left', 'start')}
                    onMouseDown={() => scrollEquipment('left', 'start')}
                    onMouseUp={() => scrollEquipment('left', 'stop')}
                />
            </div>

            <div className='recipe-card-equipment'
                ref={equipmentTileRef}
            // onLoad={handleEquipmentTileLoad}
            >
                {equipmentUsed?.map((item: any, index: number) => (
                    equipmentTile(item, index)
                ))}
            </div>
            <div>
                <AiOutlineRight
                    size={30}
                    className={'h-100 border ' + statusRight}
                    // onClick={() => scrollEquipment('right', 'start')}
                    onMouseDown={() => scrollEquipment('right', 'start')}
                    onMouseUp={() => scrollEquipment('right', 'stop')}
                />
            </div>

        </div >
    )
}

export default EquipmentContainer