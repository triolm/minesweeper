import React, { useState } from 'react';
import './Square.css';


const Square = ({ val, revealed, coords, revealTile, revealAll, inGame }) => {
    const [flagged, setFlagged] = useState(false);
    if (inGame === 0 && flagged) {
        setFlagged(false);
    }
    if (revealed && val === -1) {
        return (
            <button className="m-square mine"></button>
        )
    }
    if (!revealed && flagged) {
        return (
            <button onContextMenu={() => setFlagged(false)} onClick={() => setFlagged(false)} className="m-square unrevealed flagged" ></button>
        )
    }
    if (!revealed) {
        return (
            <button onContextMenu={() => { if (inGame === 1) { setFlagged(true); } }} onClick={() => { if (inGame !== -1) { revealTile(coords[0], coords[1]) } }} className="m-square unrevealed"></button>
        )
    }
    return (
        <button className={"adj" + val + " m-square"} >{val === 0 ? "" : val}</button>
    )

}

export default Square