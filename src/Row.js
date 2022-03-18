import React, { useState } from 'react';
import Square from './Square.js'

const Row = ({ values, mask, row, revealTile, revealAll, inGame }) => {
    return (
        <div className='row'>
            {values.map((val, i) => <Square val={val} inGame={inGame} revealTile={revealTile} revealAll={revealAll} revealed={mask[i]} coords={[row, i]} key={i} />)}

        </div>
    )
}

export default Row