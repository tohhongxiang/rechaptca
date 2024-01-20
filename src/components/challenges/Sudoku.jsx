import React, { useState, useEffect } from 'react';
import { Container, Button } from '@mantine/core';

const API_URL = "https://sudoku-api.vercel.app/api/dosuku"
const GRID_SIZE = "33px"

// Helper function
function nullifyArray(_2dArray) {
  return _2dArray.map(row => row.map(num => 
    num === 0 ? "" : num.toString()  
  ))
}

// Helper function
function areArraysEqual(arr1, arr2) {
  // Check if the arrays have the same dimensions
  if (arr1.length !== arr2.length || arr1[0].length !== arr2[0].length) {
    return false;
  }

  // Iterate through each element and compare
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      if (arr1[i][j] !== arr2[i][j]) {
        return false;
      }
    }
  }

  // If all elements are equal, return true
  return true;
}

export default function Sudoku({ onCorrectAnswer, onIncorrectAnswer }) {
  const [userGrid, setUserGrid] = useState([]);
  const [fixedChecks, setFixedChecks] = useState([]);
  const [solutionGrid, setSolutionGrid] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data);
        const boardData = data.newboard;
        if (boardData.message !== "All Ok") {
          throw new Error('Failed to fetch data');
        }

        const gridData = boardData.grids[0];
        console.log("Difficulty:", gridData.difficulty);
        setUserGrid(nullifyArray(gridData.value));
        setFixedChecks(gridData.value.map(row => row.map(num => num === 0 ? false : true)));
        setSolutionGrid(nullifyArray(gridData.solution));
        console.log(solutionGrid);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  console.log(userGrid);

  // Handler for updating input values
  const handleInputChange = (value, rowIndex, colIndex) => {
    const newInputValues = userGrid.map((row, i) =>
      i === rowIndex ? row.map((cell, j) => (j === colIndex ? value : cell)) : row
    );
    setUserGrid(newInputValues);
  };

  // Helper function to create the individual cells with input fields
  const renderCell = (value, rowIndex, colIndex) => (
    <div key={`${rowIndex}-${colIndex}`} className="cell">
        {fixedChecks[rowIndex][colIndex] ? 
        <div style={{width:GRID_SIZE, height:GRID_SIZE, border: '1px solid #000', textAlign:"center"}}>{userGrid[rowIndex][colIndex]}</div> :
        <input
          style={{width:GRID_SIZE, height:GRID_SIZE, textAlign:"center", border: '1px solid #000'}}
          type="text"
          maxLength="1"
          value={userGrid[rowIndex][colIndex]}
          onChange={(e) => handleInputChange(e.target.value, rowIndex, colIndex)}
        />}
    </div>
  );

  // Helper function to create a row of cells
  const renderRow = (row, rowIndex) => (
    <div style={{display:"flex"}} key={rowIndex} className="row">
      {row.map((value, colIndex) => renderCell(value, rowIndex, colIndex))}
    </div>
  );

  const handleSolve = () => {
    if (areArraysEqual(userGrid, solutionGrid))
      onCorrectAnswer();
    else
      onIncorrectAnswer();
  };

  return (
    <Container style = {{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{display:"flex"}}>
        <h1>Solve this Sudoku</h1>
        <Button onClick={handleSolve} style={{ marginTop: '20px', marginLeft: '20px' }}>
          Solve
        </Button>
      </div>
      <div style={{display:"flex", flexDirection:"column"}}>
        {userGrid.map((row, rowIndex) => renderRow(row, rowIndex))}
      </div>
    </Container>
  );
}