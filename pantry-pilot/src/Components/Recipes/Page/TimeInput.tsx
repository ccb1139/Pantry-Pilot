import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Props {
  onSetTime: (totalSeconds: number) => void;
}

const CountdownInput: React.FC<Props> = ({ onSetTime }) => {
  const [timeString, setTimeString] = useState<string>('');

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]);([0-5][0-9]);([0-5][0-9])$/; // Regular expression for valid time input

    if (regex.test(value) || value === '') { // Only update the state if the value is a valid time input or an empty string
      setTimeString(value);
    }
    setTimeString(timeString);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const timeParts = timeString.split(';');
    const hours = parseInt(timeParts[0]) || 0;
    const minutes = parseInt(timeParts[1]) || 0;
    const seconds = parseInt(timeParts[2]) || 0;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    onSetTime(totalSeconds);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Countdown Time (HH;MM;SS):
        <input type="text" defaultValue={timeString} onChange={handleTimeChange} />
      </label>
      <button type="submit">Start Countdown</button>
    </form>
  );
};

export default CountdownInput;
