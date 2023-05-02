import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

// Components
import TimeInput from './TimeInput'

// Timer
import { useCountdown, CountdownCircleTimer } from 'react-countdown-circle-timer'

type Props = {}

function Timer({ }: Props) {
    const [timerGoing, setTimerGoing] = useState<boolean>(false);
    const [timerTime, setTimerTime] = useState<number>(2);
    const [key, setKey] = useState(0);

    const [times, setTimes] = useState(['', '', '', '', '', '']);

    function handleChange(index: any, event: any) {
        const newTimes = [...times];
        newTimes[index] = event.target.value;
        for (let i = index + 1; i < 6; i++) {
            newTimes[i] = '';
            newTimes[i] = times[i - 1];
            
        }
        setTimes(newTimes);
    }

    const TimerInput = () => {
        
        return (
        <div className='timer-hour'>
            {times.map((time, index) => (
                <input
                    key={index}
                    type="number"
                    value={time}
                    onChange={(event) => handleChange(index, event)}
                />
            ))}
        </div>
    )}

    const {
        path,
        pathLength,
        stroke,
        strokeDashoffset,
        remainingTime,
        elapsedTime,
        size,
        strokeWidth,
    } = useCountdown({ isPlaying: true, duration: 7, colors: '#abc' })

    function changeTimerTime(time: number) {
        setTimerTime(time)
        setKey(prevKey => prevKey + 1)
    }
    return (
        <div className='recipe-utility-timer-container'>
            <h5 className='me-auto'>Timer:</h5>
            <div className='recipe-utility-timer-header'>
                <input className='timer-hour' type='number' max={99} placeholder='hour' onChange={(e) => { changeTimerTime(parseInt(e.target.value)) }} />
                <input className='timer-min' type='number' max={59} defaultValue={timerTime} onChange={(e) => { changeTimerTime(parseInt(e.target.value)) }} />
                <input className='timer-sec' type='number' max={59} defaultValue={timerTime} onChange={(e) => { changeTimerTime(parseInt(e.target.value)) }} />
                <TimeInput onSetTime={setTimerTime} />
            </div>
            <div className='recipe-utility-timer-body'>
                <div >
                    <CountdownCircleTimer
                        key={key}
                        isPlaying={timerGoing}
                        duration={timerTime}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[7, 5, 2, 0]}
                        onComplete={() => {
                            setTimerGoing(false)
                            return { delay: 0, newInitialRemainingTime: timerTime }
                        }}
                    >
                        {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                </div>
                <div className='custom-tab-btn' onClick={() => { setTimerGoing(!timerGoing) }}>
                    {timerGoing ? 'Pause' : 'Start'}
                </div>
            </div>

            <div className='custom-tab-btn' onClick={() => { changeTimerTime(2) }}>
                reset
            </div>
        </div>
    )
}

export default Timer