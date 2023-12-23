import { useState } from "react";
import Header from "./Header.jsx";
import Player from "./Player.jsx";
import Board from "./Board.jsx";
import GameOver from "./GameOver.jsx";
import Log from "./Log.jsx";
import { checkWinner, computerChoice } from "./Utils.js";
import Process from "./Process.jsx";
import Footer from "./Footer.jsx";

let winner = null;
let isDraw = null;
let isThinking = false;
let winSquares = null;
let computerSymbol = ["X", "O"][Math.floor(Math.random() * 2)];
console.log("Computer :", computerSymbol);

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState({
    X: "អ្នកលេងទី១",
    O: "អ្នកលេងទី២",
  });

  const result = checkWinner(gameTurns);
  winner = result.winner;
  winSquares = result.winSquares;
  isDraw = !winner && gameTurns.length == 9;
  if (winner && activePlayer != winner) {
    setActivePlayer(() => winner);
  }


  function handleClick(row, col) {
    setActivePlayer((preVal) => (preVal == "X" ? "O" : "X"));
    isThinking = false;
    setGameTurns((preTurns) => {
      preTurns.unshift({ player: activePlayer, rowIndex: row, colIndex: col });
      return preTurns;
    });
  }
  function rematch() {
    setActivePlayer("X");
    setGameTurns([]);

    computerSymbol = ["X", "O"][Math.floor(Math.random() * 2)];
    console.log("Computer :", computerSymbol);
  }

  function handleChangePlayerName(symbol, newName) {
    setPlayerNames((preVal) => {
      preVal[symbol] = newName;
      return preVal;
    });
  }
  if (!winner && !isDraw) {
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
        <Board
          onClick={handleClick}
          gameTurns={gameTurns}
          winSquares={winSquares}
        />
      </div>
      {(winner || isDraw) && (
        <GameOver
          onRestart={rematch}
          winner={playerNames[winner]}
          draw={isDraw}
        />
      )}
      {isThinking && <Process activePlayer={playerNames[computerSymbol]} />}
      <Log gameTurns={gameTurns} playerNames={playerNames}></Log>
      <Footer />
    </>
  );
}

export default App;
