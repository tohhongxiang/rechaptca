import React, { useState, useEffect } from 'react';
import { Button, Modal } from '@mantine/core'; 

const MAX_V_POS_PERCENT = 84;
const MAX_H_POS_PERCENT = 108;
const DURATION = 15 * 1000; // 1 minute in milliseconds

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
    <div style={{ position: 'relative', width: "500px", height: "500px"}}>
      <Button
        style={{fontSize:"15px", backgroundColor: buttonColor, width: "80px", height: "80px", left: `${buttonPosition.x}%`, top: `${buttonPosition.y}%`}}
        onMouseOver={movingWhileAvoiding}
        onClick={onCorrectAnswer}
        radius="100%"
        >
        Click <br /> Me
      </Button>
    </div>
  );
};
