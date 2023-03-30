import React, { useState, useEffect, useRef, forwardRef } from 'react';

// Bootstrap Imports
import Form from 'react-bootstrap/Form';


// CSS imports
import '../../css/Structrual.css'


const DynamicInput = ({ initialValue, fontSize }) => {
  const inputRef = useRef(null);
  const [inputWidth, setInputWidth] = useState('auto');

  useEffect(() => {
    const fontSize = window.getComputedStyle(inputRef.current).getPropertyValue('font-size');
    setInputWidth(`${inputRef.current.scrollWidth}px`);
    console.log(inputRef.current);
  }, [initialValue]);

  return (
    <Form.Control
      ref={inputRef}
      type="text"
      defaultValue={initialValue}
      style={{ width: inputWidth, fontSize }}
    />
  );
};


// function DynamicInput({initialValue, scaleSize}) {
//   const [value, setValue] = useState(initialValue);

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   // Calculate the width of the input based on the length of the value
//   const inputWidth = `${value.length * 16}px`;

//   return (
//     <input
//       type="text"
//       defaultValue={value}
//       onChange={handleChange}
//       style={{ width: inputWidth }}
//       className="dynamic-input" // Apply a CSS class for styling
//     />
//   );
// }

export default DynamicInput;