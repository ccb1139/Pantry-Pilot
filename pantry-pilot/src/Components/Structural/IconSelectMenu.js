import React, { useState, useEffect, useRef } from 'react'

//Emoji Picker Imports
import EmojiPicker, { Categories, Emoji } from 'emoji-picker-react';

//Bootstrap Imports
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


function IconSelectMenu({ Icon }) {
    const [defaultEmoji, setDefaultEmoji] = useState("🍎");

    function onEmojiClick(emojiObject) {
        console.log(emojiObject);
        
        setDefaultEmoji(emojiObject.emoji);
    }

    const popover = (
        <Popover id="popover-basic">
            {/* <Popover.Body className='d-flex'>
                
            </Popover.Body> */}
            <EmojiPicker onEmojiClick={onEmojiClick}
                categories={[
                    {
                        name: "Food & Drink",
                        category: Categories.FOOD_DRINK
                    }
                ]}
            />
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="right" overlay={popover} rootClose>
            <Button variant=""><Emoji unified={Icon}/></Button>
            
        </OverlayTrigger>
    );
}

export default IconSelectMenu