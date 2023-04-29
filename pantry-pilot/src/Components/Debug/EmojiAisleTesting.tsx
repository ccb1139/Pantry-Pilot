import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

import { aisleEmojis } from '../Recipes/Page/SpoonacularAisleEmojis'
import { Emoji } from 'emoji-picker-react';

type Props = {}

function EmojiAisleTesting({ }: Props) {
    const [ailses, setAisles] = useState<any[]>([]);
    const [emoji, setEmoji] = useState<any[]>([]);

    useEffect(() => {
        let aisles: any = [];
        let emojis: any = [];
        for (const [key, value] of Object.entries(aisleEmojis)) {
            aisles.push(key);
            emojis.push(value);
        }
        setAisles(aisles);
        setEmoji(emojis);
    }, [])

    return (
        <div className='border'>
            {ailses.map((aisle, index) => {
                return (
                    <div className='d-flex border' key={index}>
                        <div>{aisle}</div>
                        {/* <div>{String.fromCodePoint(parseInt(emoji[index], 16))}</div> */}
                        <Emoji unified={emoji[index]} />
                    </div>
                )
            })}
        </div>
    )
}

export default EmojiAisleTesting