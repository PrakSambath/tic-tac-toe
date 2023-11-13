export default function Log({ gameTurns, playerNames }) {
  return (
    <ol id="log">
      {gameTurns.map((turn) => (
        <li key={`${turn.player}${turn.rowIndex}${turn.colIndex}`}>{`${
          playerNames[turn.player]
        } ជួរដេក:${turn.rowIndex + 1} ជួរឈរ:${turn.colIndex + 1}`}</li>
      ))}
    </ol>
  );
}
