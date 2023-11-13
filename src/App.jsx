import { useState } from "react";
import Header from "./Header.jsx";
import Player from "./Player.jsx";
import Board from "./Board.jsx";
import GameOver from "./GameOver.jsx";
import Log from "./Log.jsx";
import { checkWinner, computerChoice } from "./Utils.js";
import Process from "./Process.jsx";

const initialBoards = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
let playerWin = null;
let isDraw = null;
let isThinking = false;
const symbols = ["X", "O"];
// let winSquares = null;
let computerSymbol = ["X", "O"][Math.floor(Math.random() * 2)];
console.log("Computer :", computerSymbol);

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  // const [boards, setBoards] = useState(initialBoards);
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState({
    X: "អ្នកលេងទី១",
    O: "អ្នកលេងទី២",
  });

  playerWin = checkWinner(gameTurns);
  // const result = checkWinner(gameTurns);

  // if (result != null) {
  //   playerWin = result.player;
  //   winSquares = result.winSquare;
  // }

  isDraw = !playerWin && gameTurns.length == 9;

  function handleChangePlayer() {
    setActivePlayer((preVal) => (preVal == "X" ? "O" : "X"));
    isThinking = false;
  }

  function handleClick(row, col) {
    // console.log(row, col);

    // setBoards((preBoard) => {
    //   const newBoard = [...preBoard.map((item) => [...item])];
    //   newBoard[row][col] = activePlayer;
    //   return newBoard;
    // });
    handleChangePlayer();
    let newGameTurns = null;
    setGameTurns((preTurns) => {
      preTurns.unshift({ player: activePlayer, rowIndex: row, colIndex: col });
      return preTurns;
    });
  }
  function rematch() {
    setActivePlayer("X");
    // setBoards(() => initialBoards);
    setGameTurns([]);
    playerWin = null;
    isDraw = null;
    computerSymbol = ["X", "O"][Math.floor(Math.random() * 2)];
    console.log("Computer :", computerSymbol);
  }

  function handleChangePlayerName(symbol, newName) {
    setPlayerNames((preVal) => {
      preVal[symbol] = newName;
      return preVal;
    });
  }
  if (!playerWin && !isDraw) {
    if (activePlayer === computerSymbol) {
      isThinking = true;
      setTimeout(() => {
        computerChoice(gameTurns, handleClick, computerSymbol);
      }, 2000);
    }
  }

  return (
    <>
      <Header />
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={playerNames.X}
            symbol={"X"}
            active={activePlayer == "X"}
            onChangePlayerName={handleChangePlayerName}
          />
          <Player
            name={playerNames.O}
            symbol={"O"}
            active={activePlayer == "O"}
            onChangePlayerName={handleChangePlayerName}
          />
        </ol>
        <Board onClick={handleClick} gameTurns={gameTurns} />
      </div>
      {(playerWin || isDraw) && (
        <GameOver
          onRestart={rematch}
          winner={playerNames[playerWin]}
          draw={isDraw}
        />
      )}
      {isThinking && <Process activePlayer={playerNames[computerSymbol]} />}
      <Log gameTurns={gameTurns} playerNames={playerNames}></Log>
    </>
  );
}

export default App;
