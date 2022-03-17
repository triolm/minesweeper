import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';



const Square = (props) => {
  const [adj, setAdj] = useState(props.value)
  const [revealed, setRevealed] = useState(false)
  if (revealed && adj == -1) {
    return (
      <button onClick={() => setRevealed(1)} className="square mine"></button>
    )
  }
  if (!revealed) {
    return (
      <button onClick={() => setRevealed(1)} className="square unrevealed"></button>
    )
  }
  return (
    <button className="square">{adj}</button>
  )

}

const Row = (props) => {
  return (
    <div className='row'>
      {props.arr.map((val, i) => <Square value={val} key={i} />)}

    </div>
  )
}

const Grid = () => {
  let [grid, setGrid] = useState([]);

  grid = generateGrid(15);

  return (
    <div>
      {grid.map((rowVals, i) => <Row arr={rowVals} key={i} />)}
    </div>
  )
}

const generateGrid = (size) => {
  let newGrid = []
  for (let i = 0; i < size; i++) {
    newGrid.push([]);
    for (let j = 0; j < size; j++) {
      newGrid[i].push(Math.random() > .8 ? -1 : 0);
    }
  }

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[0].length; j++) {
      // if (newGrid[i][j] === -1) {
      //   break;
      // }

      let neighbors = 0;
      for (let ni = i - 1; ni < i + 2; ni++) {
        for (let nj = j - 1; nj < j + 2; nj++) {


          if (ni >= 0 && ni < newGrid.length
            && nj >= 0 && nj < newGrid[i].length
            && newGrid[ni][nj] === -1) {
            neighbors++;

          }

        }
      }
      newGrid[i][j] = newGrid[i][j] == -1 ? -1 : neighbors;
    }
  }

  return newGrid;
}




function App() {
  return (
    <div className="App">

      <Grid />
    </div>
  );
}

export default App;
