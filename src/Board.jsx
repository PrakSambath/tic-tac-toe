import Sound from "./assets/click.mp3";
import React from "react";

function Board({ gameTurns, onClick }) {
  // console.log(winSquares);
  function play() {
    new Audio(Sound).play();
  }

  // function matchWinSquare(rowIndex, colIndex) {
  //   if (winSquares != null) {
  //     for (let i = 0; i < 3; i++) {
  //       console.log("style box");
  //       if (rowIndex == winSquares[i][0] && colIndex == winSquares[i][1]) {
  //         // console.log("style box");
  //         return "match";
  //       } else {
  //         return null;
  //       }
  //     }
  //   }
  //   // console.log("style box");
  // }

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

  return (
    <div id="game-board">
      <ol>
        {boards.map((row, indexRow) => (
          <ol key={`${indexRow}`}>
            {row.map((col, indexCol) => (
              <li key={`${indexRow}${indexCol}`}>
                <button
                  // className={matchWinSquare(indexRow, indexCol)}
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
