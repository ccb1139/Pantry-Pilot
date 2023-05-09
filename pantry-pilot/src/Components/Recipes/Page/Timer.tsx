import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react'

// Components
import TimeInput from './TimeInput'

// Timer
import { useCountdown, CountdownCircleTimer } from 'react-countdown-circle-timer'

// Icon Imports
import { FaPlay, FaPause, FaStop } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'

// Sound
// import { alarm } from '../../../sound/alarm'
const alarm = require('../../../sound/alarm.mp3')

type Props = {}

/*
NEED TO ADD TIMER END ANIMATION

*/


function Timer({ }: Props) {
    const [timerGoing, setTimerGoing] = useState<boolean>(false);
    const [timerTimeSeconds, setTimerTimeSeconds] = useState<number>(-1);

    const [key, setKey] = useState(0);

    const audioRef = useRef<any>(null);

    function startTimer(timeArr: string[]) {

        setTimerTimeSeconds(timeToSeconds(timeArr));
        setKey(prevKey => prevKey + 1);
        console.log(timerTimeSeconds)
        setTimerGoing(true)
    }
    function resetTimer() {
        setTimerGoing(false);
        setTimerTimeSeconds(-1);
        setKey(prevKey => prevKey + 1);
        audioRef?.current.pause();
    }

    const timeToSeconds = useCallback((timeArray: string[]): number => {
        const [hours, minutes, seconds] = timeArray.map((t) => parseInt(t.trim(), 10));
        const totalSeconds = (hours * 60 * 60) + (minutes * 60) + seconds;
        return totalSeconds;
    }, []);

    const TimerDisplay = ({ hr, mn, sc }: any) => {
        if (hr < 10) { hr = '0' + hr; }
        if (mn < 10) { mn = '0' + mn; }
        if (sc < 10) { sc = '0' + sc; }
        return (
            <div className='timer-display'>
                <div className='timer-display-num'>
                    {(hr === 0 || hr === '00') ?
                        ((mn === 0 || mn === '00') ?
                            (<span> {sc} </span>)
                            : (<span> {mn} : {sc} </span>))
                        : (<span> {hr} : {mn} : {sc}</span>)}
                </div>
                <div className='custom-tab-btn timer-display-btn' onClick={() => { setTimerGoing(!timerGoing) }}>
                    {timerGoing ? <FaPause /> : <FaPlay />}


                </div>
            </div>
        )
    }

    const TimerCountdown = ({ remainingTime }: any) => {
        const hours = Math.floor(remainingTime / 3600)
        const minutes = Math.floor((remainingTime % 3600) / 60)
        const seconds = remainingTime % 60
        // console.log(remainingTime)
        // console.log(hours, minutes, seconds)
        if (remainingTime === 0) {
            return (<div> <TimeInput onSetTime={startTimer} /> </div>)
        } else {
            return (
                <TimerDisplay hr={hours} mn={minutes} sc={seconds} />
            )
        }

    }

    return (
        <div className='recipe-utility-timer-container'>
            <h5 className='me-auto'>Timer:</h5>
            {/* <TimeInput onSetTime={startTimer} /> */}
            <div className='recipe-utility-timer-body'>
                <audio ref={audioRef} id='alarm' src={alarm} preload='auto' loop />
                <div>
                    <CountdownCircleTimer
                        key={key}
                        isPlaying={timerGoing}
                        duration={(timerTimeSeconds === -1) ? 0 : timerTimeSeconds}
                        colors={['#198754', '#ff0000']}
                        colorsTime={[10, 0]}
                        children={TimerCountdown}
                        size={200}
                        strokeLinecap='butt'
                        onComplete={() => {
                            setTimerGoing(false);
                            audioRef?.current.play();
                            return { delay: 0, newInitialRemainingTime: timerTimeSeconds }
                        }}
                    />
                </div>
                {(!timerGoing && timerTimeSeconds !== -1) ?
                    <div className='custom-tab-btn reset-btn' onClick={() => { resetTimer() }}>
                        Reset
                    </div> : null}
            </div>
        </div>
    )
}

export default Timer