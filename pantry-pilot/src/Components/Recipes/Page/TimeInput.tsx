import React, { useState, ChangeEvent, useRef, FormEvent, useEffect } from 'react';

interface Props {
  onSetTime: any;
}

const CountdownInput: React.FC<Props> = ({ onSetTime }) => {
  const [timeString, setTimeString] = useState<string>('');
  const [timerTime, setTimerTime] = useState<string[]>(['0', '0', '0']);

  const hourRef = useRef<any>(null);
  const minRef = useRef<any>(null);
  const secRef = useRef<any>(null);



  const handleTimeChange = (event: any) => {
    console.log(event.target.className)
    const { className, value } = event.target;
    // if (value.length === 1) {
    //   event.target.value = '0' + value;
    // } else if (value.length !== 0) {
    //   event.target.value = parseInt(value);
    // }
    switch (className) {
      case 'timer-hour':
        if (value > 99) {
          hourRef.current.value = 99;
        } else if (value < 0) {
          hourRef.current.value = 0;
        }
        setTimerTime([value, timerTime[1], timerTime[2]]);
        break;
      case 'timer-min':
        if (value > 59) {
          minRef.current.value = 59;
        } else if (value < 0) {
          minRef.current.value = 0;
        }
        setTimerTime([timerTime[0], value, timerTime[2]]);
        break;
      case 'timer-sec':
        if (value > 59) {
          secRef.current.value = 59;
        } else if (value < 0) {
          secRef.current.value = 0;
        }
        setTimerTime([timerTime[0], timerTime[1], value]);
        break;
      default:
        break;
    }

  };

  useEffect(() => {
    console.log(timerTime)
  }, [timerTime])

  const handleSubmit = (event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    // const timeParts = timeString.split(';');
    // const hours = parseInt(timeParts[0]) || 0;
    // const minutes = parseInt(timeParts[1]) || 0;
    // const seconds = parseInt(timeParts[2]) || 0;
    // const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    // console.log(timerTime)
    onSetTime(timerTime);
  };

  return (
    <form onSubmit={handleSubmit} className='timer-input-display'>

      <div className='recipe-utility-timer-header '>
        <input className='timer-hour' ref={hourRef} type='number' max={99} placeholder='hour' onChange={(e) => { handleTimeChange(e) }} />
        <span className='fw-bolder fs-5'> : </span>
        <input className='timer-min' ref={minRef} type='number' max={59} placeholder='min' onChange={(e) => { handleTimeChange(e) }} />
        <span className='fw-bolder fs-5'> : </span>
        <input className='timer-sec' ref={secRef} type='number' max={59} placeholder='sec' onChange={(e) => { handleTimeChange(e) }} />
        {/* <TimeInput onSetTime={setTimerTime} /> */}
      </div>

      <div className='custom-tab-btn fw-bold' onClick={(e) => { handleSubmit(e); }}>
        Start
      </div>
      {/* <button type="submit" style={{display: 'none'}}></button> */}
    </form>
  );
};

export default CountdownInput;
