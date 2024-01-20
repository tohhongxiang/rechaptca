import React, { useState, useEffect } from 'react';
import { Button } from '@mantine/core';

const INIT_SECONDS = 1.5;
const MILLISEC_THRES = 150;

export default function CatchCountDownTimer({ onCorrectAnswer, onIncorrectAnswer }) {
  const [timeRemaining, setTimeRemaining] = useState(INIT_SECONDS * 1000);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (starting) {
      const intervalId = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 15);
      }, 1);
      
      // Clean up the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }
  }, [starting]); // Empty dependency array to run the effect only once

  const displayTime = (time) => {
    const seconds = Math.trunc(time / 1000);
    return `${seconds}.${(Math.abs(time % 1000)).toString().padStart(3, '0')} s`;
  };

  function checkTimeWithinRange() {
    console.log("Remaining time: ", timeRemaining);
    if (Math.abs(timeRemaining) > MILLISEC_THRES) {
      onIncorrectAnswer();
    } else {
      onCorrectAnswer();
    }
  }

  return (starting ?
    <div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <p>Time Remaining:</p>
        <h1>{displayTime(timeRemaining)}</h1>
      </div>
      <Button style={{backgroundColor: Math.abs(timeRemaining) > MILLISEC_THRES ? "" : "green", width:"100%"}} size="lg" onClick={checkTimeWithinRange}>Click me</Button>
    </div>
    :
    <div>
      <p>You will be shown a countdown timer. Click the button when the timer is between <strong>-{MILLISEC_THRES/1000}</strong> and <strong>{MILLISEC_THRES/1000}</strong>.</p>
      <div style={{display:"flex", justifyContent:"center"}}>
        <Button style={{backgroundColor: ""}} onClick={() => setStarting(true)}>START</Button>
      </div>
    </div>
  );
};