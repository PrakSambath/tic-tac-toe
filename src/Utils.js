import { winPos } from "./data.js";

export function checkWinner(gameTurns) {
  const len = gameTurns.length;
  for (let row = 0; row < 8; row++) {
    let count_x = 0;
    let count_o = 0;
    for (let col = 0; col < 3; col++) {
      for (let k = 0; k < len; k++) {
        const turn = gameTurns[k];
        if (turn.player == "X") {
          if (
            turn.rowIndex == winPos[row][col][0] &&
            turn.colIndex == winPos[row][col][1]
          ) {
            count_x += 1;
          }
        }

        if (turn.player == "O") {
          if (
            turn.rowIndex == winPos[row][col][0] &&
            turn.colIndex == winPos[row][col][1]
          ) {
            count_o += 1;
          }
        }
      }
    }
    if (count_x == 3) {
      return "X";
      // return { player: "X", winSquare: winPos[row] };
    }
    if (count_o == 3) {
      return "O";
      // return { player: "O", winSquare: winPos[row] };
    }
  }
  return null;
}

function possibleChoice(gameTurns, symbol) {
  const len = gameTurns.length;

  for (let row = 0; row < 8; row++) {
    let countStep = 0;
    let selectedPos = [];
    for (let col = 0; col < 3; col++) {
      for (let k = 0; k < len; k++) {
        const turn = gameTurns[k];
        if (turn.player == symbol) {
          if (
            turn.rowIndex == winPos[row][col][0] &&
            turn.colIndex == winPos[row][col][1]
          ) {
            countStep += 1;
            selectedPos.push(winPos[row][col]);
          }
        }
      }
    }
    if (countStep == 2) {
      const pos = winPos[row];
      for (let i = 0; i < 3; i++) {
        let possibles = pos[i];
        for (let j = 0; j < 2; j++) {
          if (selectedPos[j] == possibles[i]) {
            possibles = null;
          }
        }
        if (possibles != null) {
          if (isAvailable(gameTurns, possibles)) {
            return possibles;
          }
        }
      }
    }
  }
  return null;
}

function isAvailable(gameTurns, pos) {
  const len = gameTurns.length;
  for (let i = 0; i < len; i++) {
    const turn = gameTurns[i];
    if (turn.rowIndex == pos[0] && turn.colIndex == pos[1]) {
      return false;
    }
  }
  return true;
}

export function computerChoice(gameTurns, onClick, symbol) {
  const len = gameTurns.length;
  let possiblePos = false;
  let randRow = null;
  let randCol = null;
  const computerSymbol = symbol;
  const playerSymbol = symbol === "X" ? "O" : "X";
  while (!possiblePos && len < 9) {
    const posWin = possibleChoice(gameTurns, computerSymbol);
    const posDefends = possibleChoice(gameTurns, playerSymbol);
    if (posWin != null) {
      randRow = posWin[0];
      randCol = posWin[1];
    } else if (posDefends != null) {
      randRow = posDefends[0];
      randCol = posDefends[1];
    } else {
      randRow = Math.floor(Math.random() * 3);
      randCol = Math.floor(Math.random() * 3);
    }
    // console.log("random: ", randRow, randCol);
    possiblePos = true;
    for (let i = 0; i < len; i++) {
      const turn = gameTurns[i];
      if (turn.rowIndex == randRow && turn.colIndex == randCol) {
        possiblePos = false;
      }
    }
  }

  if (randRow != null && randCol != null) {
    onClick(randRow, randCol);
    // console.log("possible pos: ", randRow + 1, randCol + 1);
  }
}
