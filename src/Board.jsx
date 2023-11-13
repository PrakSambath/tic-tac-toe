import Sound from "./assets/click.mp3";
import React from "react";

function Board({ gameTurns, onClick, winSquares }) {
  function play() {
    new Audio(Sound).play();
  }

  const boards = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const turnLen = gameTurns.length;
  if (turnLen > 0) {
    for (let i = 0; i < turnLen; i++) {
      const turn = gameTurns[i];
      boards[turn.rowIndex][turn.colIndex] = turn.player;
    }
  }
  const styles = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  if (winSquares != null) {
    for (let i = 0; i < 3; i++) {
      styles[winSquares[i][0]][winSquares[i][1]] = "win";
    }
  }

  return (
    <div id="game-board">
      <ol>
        {boards.map((row, indexRow) => (
          <ol key={`${indexRow}`}>
            {row.map((col, indexCol) => (
              <li key={`${indexRow}${indexCol}`}>
                <button
                  className={styles[indexRow][indexCol]}
                  onClick={() => {
                    play();
                    onClick(indexRow, indexCol);
                  }}
                  disabled={col}
                >
                  {col}
                </button>
              </li>
            ))}
          </ol>
        ))}
      </ol>
    </div>
  );
}

export default Board;
