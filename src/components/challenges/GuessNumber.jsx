import React, { useState } from 'react';

const MAX_NUM_OF_TRIALS = 10;

export default function GuessNumber({ onCorrectAnswer, onIncorrectAnswer }) {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [numOfTrials, setNumOfTrials] = useState(1);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100); // Generates a random number between 1 and 100
  }

  const handleGuess = () => {
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

  return (
    <div style={{display:"flex", flexDirection: "column",justifyContent:"centre", alignContent:"centre"}}>
      <h2>What number am thinking?</h2>
      <div>
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Enter your guess"
          />
        <button onClick={handleGuess}>Submit Guess</button>
      </div>
      <p>{message}</p>
    </div>
  );
};