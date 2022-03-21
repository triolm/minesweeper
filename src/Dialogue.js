
const Dialogue = ({ reset, status }) => {
    return (
        <div className='dialogue'>
            <p>
                You {status === -1 ? "lose" : "win"}!
            </p>
            <button onClick={reset}>Play Again</button>
        </div>
    )
}
export default Dialogue;