import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import { useState } from "react";
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./Components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [player, setPlayer] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);
  //const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { squre, player } = turn;
    const { row, col } = squre;
    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSqureSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSqureSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSqureSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSqureSymbol &&
      firstSqureSymbol === secondSqureSymbol &&
      firstSqureSymbol === thirdSqureSymbol
    ) {
      winner = player[firstSqureSymbol];
    }
  }

  function handleSelectSqure(rowIndex, colIndex) {
    //setActivePlayer((currentActivePlayer) =>currentActivePlayer === "X" ? "O" : "X");
    setGameTurns((prevturnes) => {
      const curentPlayer = deriveActivePlayer(prevturnes);
      const updatedTurns = [
        { squre: { row: rowIndex, col: colIndex }, player: curentPlayer },
        ...prevturnes,
      ];
      return updatedTurns;
    });
  }

  const hasDraw = gameTurns.length === 9 && !winner;
  
  function handleRestart() {
    setGameTurns([]);
  }
  
  function handlePlayers(symbol,newName) {
    setPlayer(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            intialname="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayers}
          />
          <Player
            intialname="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayers}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestar={handleRestart} />
        )}
        <GameBoard onSelectSqure={handleSelectSqure} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
