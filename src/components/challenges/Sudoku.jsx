import React, { useState, useEffect } from "react";
import { Container, Button, Loader } from "@mantine/core";
import getRandomInt from "../../utils/getRandomInt";

const API_URL = "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{solution}}}";
const GRID_SIZE = "33px";

// Helper function
function nullifyArray(_2dArray) {
  return _2dArray.map((row) =>
    row.map((num) => (num === 0 ? "" : num.toString()))
  );
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

function hasDuplicate(set, tuple) {
  for (let existingTuple of set) {
    if (existingTuple[0] === tuple[0] && existingTuple[1] === tuple[1]) {
      return true;
    }
  }
  return false;
}

function generateTuples(count) {
  if (count > 9 * 9) {
    console.error("Cannot generate more than 81 unique tuples with integers between 1 and 9.");
    return;
  }

  let tuples = new Set();
  const localRandFunc = () => getRandomInt(0, 9);

  while (tuples.size < count) {
    let num1 = localRandFunc();
    let num2 = localRandFunc();

    let tuple = [num1, num2];

    if (!hasDuplicate(tuples, tuple)) {
      tuples.add(tuple);
    }
  }
  return Array.from(tuples);
}

function removeSomeNums(solutionGrid) {
  const tuples = generateTuples(5);
  let grid = solutionGrid.map((row) => row.map((num) => num));

  tuples.forEach((tuple) => {
    grid[tuple[0]][tuple[1]] = 0;
  });

  return grid;
}

export default function Sudoku({ onCorrectAnswer, onIncorrectAnswer }) {
  const [userGrid, setUserGrid] = useState([]);
  const [fixedChecks, setFixedChecks] = useState([]);
  const [solutionGrid, setSolutionGrid] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log("before fetch");
        const response = await fetch(API_URL);
        console.log("aft fetch");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log(data);
        const boardData = data.newboard;
        const gridData = boardData.grids[0];
        setSolutionGrid(nullifyArray(gridData.solution));
        const userGrid = removeSomeNums(gridData.solution);
        setUserGrid(nullifyArray(userGrid));
        setFixedChecks(
          userGrid.map((row) =>
            row.map((num) => (num === 0 ? false : true))
          )
        );
        console.log(solutionGrid);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  console.log(userGrid);

  // Handler for updating input values
  const handleInputChange = (value, rowIndex, colIndex) => {
    const newInputValues = userGrid.map((row, i) =>
      i === rowIndex
        ? row.map((cell, j) => (j === colIndex ? value : cell))
        : row
    );
    setUserGrid(newInputValues);
  };

  // Helper function to create the individual cells with input fields
  const renderCell = (value, rowIndex, colIndex) => (
    <div key={`${rowIndex}-${colIndex}`} className="cell">
      {fixedChecks[rowIndex][colIndex] ? (
        <div
          style={{
            width: GRID_SIZE,
            height: GRID_SIZE,
            border: "1px solid #000",
            textAlign: "center",
          }}
        >
          {userGrid[rowIndex][colIndex]}
        </div>
      ) : (
        <input
          style={{
            width: GRID_SIZE,
            height: GRID_SIZE,
            textAlign: "center",
            border: "1px solid #000",
          }}
          type="text"
          maxLength="1"
          value={userGrid[rowIndex][colIndex]}
          onChange={(e) =>
            handleInputChange(e.target.value, rowIndex, colIndex)
          }
        />
      )}
    </div>
  );

  // Helper function to create a row of cells
  const renderRow = (row, rowIndex) => (
    <div style={{ display: "flex" }} key={rowIndex} className="row">
      {row.map((value, colIndex) => renderCell(value, rowIndex, colIndex))}
    </div>
  );

  const handleSolve = () => {
    if (areArraysEqual(userGrid, solutionGrid)) onCorrectAnswer();
    else onIncorrectAnswer();
  };

  return (
    <Container
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <div style={{ display: "flex" }}>
            <h1>Solve this Sudoku</h1>
            <Button
              onClick={handleSolve}
              style={{ marginTop: "20px", marginLeft: "20px" }}
            >
              Solve
            </Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {userGrid.map((row, rowIndex) => renderRow(row, rowIndex))}
          </div>
        </>
      )}
    </Container>
  );
}
