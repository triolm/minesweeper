import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';



const Square = ({ val, revealed, coords, revealTile }) => {
	const [flagged, setFlagged] = useState(false);
	if (revealed && val == -1) {
		return (
			<button className="square mine"></button>
		)
	}
	if (!revealed && flagged) {
		return (
			<button onContextMenu={() => { setFlagged(false); return false; }} onClick={() => revealTile(coords[0], coords[1])} className="square flagged"></button>
		)
	}
	if (!revealed) {
		return (
			<button onContextMenu={() => { setFlagged(true); }} onClick={() => revealTile(coords[0], coords[1])} className="square unrevealed"></button>
		)
	}
	return (
		<button className="square" >{val}</button>
	)

}

const Row = ({ values, mask, row, revealTile }) => {
	return (
		<div className='row'>
			{values.map((val, i) => <Square val={val} revealTile={revealTile} revealed={mask[i]} coords={[row, i]} key={i} />)}

		</div>
	)
}

const Grid = () => {
	let [size, setSize] = useState(15);
	let [grid, setGrid] = useState(emptyGrid(size, 0));
	let [gridMask, setGridMask] = useState(emptyGrid(size, false));
	let [began, setBegan] = useState(false);

	const revealTile = async (x, y) => {
		gridMask[x][y] = true;
		setGridMask([...gridMask])
		if (!began) {
			began = true;
			setBegan(true)
			grid = generateGrid(size, x, y)
			setGrid(grid)
		}
		if (grid[x][y] === 0) {
			for (let nx = x - 1; nx < x + 2; nx++) {
				for (let ny = y - 1; ny < y + 2; ny++) {
					if (
						nx >= 0 && nx < size && ny >= 0 && ny < size &&
						!gridMask[nx][ny]) {
						revealTile(nx, ny);
					}
				}
			}
		}
	}

	return (
		<div className='grid'>
			{grid.map((rowVals, i) => <Row revealTile={revealTile} values={rowVals} mask={gridMask[i]} row={i} key={i} />)}
		</div>
	)
}

const emptyGrid = (size, val) => {
	const newGrid = []
	for (let i = 0; i < size; i++) {
		newGrid.push([]);
		for (let j = 0; j < size; j++) {
			newGrid[i].push(val);
		}
	}
	return newGrid;
}

const generateGrid = (size, x, y) => {
	let newGrid = emptyGrid(size, 0);

	for (let i = 0; i < size * 3; i++) {
		let coords;
		do {
			coords = [Math.floor(Math.random() * size), Math.floor(Math.random() * size)]
		} while ((Math.abs(coords[0] - x) < 2 && (Math.abs(coords[1] - y) < 2)) || newGrid[coords[0]][coords[1]] == -1)

		newGrid[coords[0]][coords[1]] = -1;
	}

	for (let i = 0; i < newGrid.length; i++) {
		for (let j = 0; j < newGrid[0].length; j++) {
			if (newGrid[i][j] === -1) {
				continue;
			}
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
			newGrid[i][j] = neighbors;
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
