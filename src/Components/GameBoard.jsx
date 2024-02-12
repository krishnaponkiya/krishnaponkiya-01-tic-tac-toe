
export default function GameBoard({ onSelectSqure, board }) {
  // how to update state immutable way
  // const[gameBoard, setGameBoard] = useState(initialGameBoard);
  // function handleSelectSqure(rowIndex, colIndex) {
  //     setGameBoard((prevGameBoard) => {
  //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
  //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //         return updatedBoard;
  //     });
  //     onSelectSqure();
  // }
  return (
    <ol id="game-board">
      {board.map((row, index) => (
        <li key={index}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSqure(index, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
