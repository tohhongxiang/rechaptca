import React, { useState, useEffect } from 'react';
import { Button } from '@mantine/core'; 

const MAX_V_POS_PERCENT = 87;
const MAX_H_POS_PERCENT = 93;
const DURATION = 30 * 1000; // 1 minute in milliseconds

export default function AvoidingButton({ onCorrectAnswer, onIncorrectAnswer }) {
  const [buttonPosition, setButtonPosition] = useState({ x: 46, y: 43 });
  const [avoiding, setAvoiding] = useState(false);
  const [buttonColor, setButtonColor] = useState("red");

  const getRandFloat = (maxVal) => Math.random() * maxVal;

  function movingWhileAvoiding() {
    if (avoiding) {
      setButtonPosition({ x: getRandFloat(MAX_H_POS_PERCENT), y: getRandFloat(MAX_V_POS_PERCENT)})
    } else {
      setButtonColor("");
    }
  } 

  useEffect(() => {
    // Start avoiding when component mounts
    setAvoiding(true);

    // Stop avoiding after the specified duration
    const timeoutId = setTimeout(() => {
      setAvoiding(false);
    }, DURATION);

    // Clean up event listener and timeout on component unmount
    return () => {
      document.removeEventListener('mouseover', movingWhileAvoiding);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div style={{width:"80vw", height:"80vh", position: 'relative'}}>
      <Button
        style={{backgroundColor: buttonColor, width: "100px", height: "100px", left: `${buttonPosition.x}%`, top: `${buttonPosition.y}%`, borderRadius: "50%"}}
        onMouseOver={movingWhileAvoiding}
        onClick={onCorrectAnswer}
        >
        Click Me
      </Button>
    </div>
  );
};
