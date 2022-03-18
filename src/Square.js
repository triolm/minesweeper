import React, { useState } from 'react';

const Square = ({ val, revealed, coords, revealTile, revealAll, inGame }) => {
    const [flagged, setFlagged] = useState(false);
    if (revealed && val === -1) {
        return (
            <button className="square mine"></button>
        )
    }
    if (!revealed && flagged) {
        return (
            <button onContextMenu={() => { if (inGame === 1) { setFlagged(false); return false; } }} className="square flagged" ></button>
        )
    }
    if (!revealed) {
        return (
            <button onContextMenu={() => { if (inGame === 1) { setFlagged(true); } }} onClick={() => { if (inGame !== -1) { revealTile(coords[0], coords[1]) } }} className="square unrevealed"></button>
        )
    }
    return (
        <button className="square" >{val}</button>
    )

}

export default Square