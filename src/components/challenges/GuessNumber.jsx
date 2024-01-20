import { Button, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import getRandomInt from "../../utils/getRandomInt";

const MAX_NUM_OF_TRIALS = 10;
const MIN_NUMBER = 0;
const MAX_NUMBER = 100;

export default function GuessNumber({ onCorrectAnswer, onIncorrectAnswer }) {
  const [randomNumber, setRandomNumber] = useState(getRandomInt(MIN_NUMBER, MAX_NUMBER));
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [numOfTrials, setNumOfTrials] = useState(1);

  const handleGuess = (e) => {
    e.preventDefault()
    const guess = parseInt(userGuess, 10);

    if (isNaN(guess)) {
      setMessage('Please enter a valid number.');
    } else {
      if (guess === randomNumber) {
        setMessage('Congratulations! You guessed the correct number!');
        onCorrectAnswer();
      } else {
        setNumOfTrials(num => num + 1);
        if (numOfTrials === MAX_NUM_OF_TRIALS) {
          setMessage('Game Over. You have exceeded the number of trials');
          onIncorrectAnswer();
        }
        if (guess < randomNumber) {
          setMessage('Too low. Try again!');
          setUserGuess("");
        } else {
          setMessage('Too high. Try again!');
          setUserGuess("");
        }
      }
    }
  };

  const attemptsRemaining = MAX_NUM_OF_TRIALS - numOfTrials + 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "centre", alignContent: "centre" }}>
      <h2>What number am thinking?</h2>
      <p>I am thinking of a number between {MIN_NUMBER} (inclusive) and {MAX_NUMBER - 1} (inclusive)</p>
      <form onSubmit={handleGuess} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <TextInput
          value={userGuess}
          onChange={(e) => setUserGuess(e.currentTarget.value)}
          placeholder="Enter your guess"
        />
        <Button type="submit">Submit ({attemptsRemaining} attempt{attemptsRemaining === 1 ? "" : "s"} remaining)</Button>
      </form>
      <p style={{ textAlign: "center" }}>{message}</p>
    </div>
  );
};