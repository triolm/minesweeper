import React, { useState } from 'react';
import Row from './Row.js'

const Grid = () => {
    let [size, setSize] = useState(18);
    let [grid, setGrid] = useState(emptyGrid(size, 0));
    let [gridMask, setGridMask] = useState(emptyGrid(size, false));
    let [inGame, setInGame] = useState(0);


    const reset = (newSize) => {
        setSize(newSize);
        setGrid(emptyGrid(newSize, 0))
        setGridMask(emptyGrid(newSize, false))
        setInGame(0);
    }

    const revealAll = () => {
        setInGame(-1);
        setGridMask(trueGrid(grid, gridMask));
    }

    const revealTile = async (x, y) => {
        gridMask[x][y] = true;
        setGridMask([...gridMask])
        if (!inGame) {
            inGame = 1;
            setInGame(1)
            grid = generateGrid(size, x, y)
            setGrid(grid)
        }
        if (grid[x][y] === -1 && inGame === 1) {
            revealAll();
        }
        else if (grid[x][y] === 0) {
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
        <>
            <div className='controls'>
                <select defaultValue="15" name="mode" id="mode" onChange={(e) => { reset(e.target.value) }}>
                    <option value="10">Easy</option>
                    <option value="15" >Medium</option>
                    <option value="20">Hard</option>
                </select>
                <button className='reset' onClick={() => reset(size)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                </svg></button>
            </div>

            <div className='grid'>
                {grid.map((rowVals, i) => <Row revealTile={revealTile} inGame={inGame} revealAll={revealAll} values={rowVals} mask={gridMask[i]} row={i} key={i} />)}
            </div>
        </>
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

const trueGrid = (grid, gridMask) => {
    const newGrid = []
    for (let i = 0; i < grid.length; i++) {
        newGrid.push([]);
        for (let j = 0; j < grid[i].length; j++) {
            newGrid[i].push(grid[i][j] === -1 || gridMask[i][j]);
        }
    }
    return newGrid;
}

const generateGrid = (size, x, y) => {
    let newGrid = emptyGrid(size, 0);

    for (let i = 0; i < (size * size) / 5; i++) {
        let coords;
        do {
            coords = [Math.floor(Math.random() * size), Math.floor(Math.random() * size)]
        } while ((Math.abs(coords[0] - x) < 1 + Math.random() * 2 && (Math.abs(coords[1] - y) < 1 + Math.random() * 2)) || newGrid[coords[0]][coords[1]] === -1)

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

export default Grid