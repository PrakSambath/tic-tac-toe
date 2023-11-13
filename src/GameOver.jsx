import Sound from "./assets/game-over.mp3";
export default function GameOver({ onRestart, winner, draw }) {
  function play() {
    new Audio(Sound).play();
  }
  play();

  return (
    // <div>
    <div id="game-over">
      {winner && (
        <>
          <h2>GAME OVER</h2>
          <p>{winner} ឈ្នះ!</p>
        </>
      )}
      {draw && (
        <>
          <h2>DRAW</h2>
          <p>ស្មើគ្នា!</p>
        </>
      )}
      <button onClick={onRestart}>ប្រកួតម្ដងទៀត</button>
    </div>
  );
}
