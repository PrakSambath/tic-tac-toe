import { useState } from "react";

export default function Player({ name, symbol, active, onChangePlayerName }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditable, setIsEditalbe] = useState(false);
  let editablePlayerName = null;
  if (isEditable) {
    editablePlayerName = (
      <input
        type="text"
        className="player-name"
        value={playerName}
        onChange={(event) => handleChange(event.target.value)}
      />
    );
  } else {
    editablePlayerName = <p className="player-name">{playerName}</p>;
  }
  function handleChange(newName) {
    setPlayerName(newName.toUpperCase());
  }
  function handleClick() {
    if (isEditable) {
      onChangePlayerName(symbol, playerName);
    }
    setIsEditalbe((preVal) => !preVal);
  }
  return (
    <li className={active ? "player active" : "player"}>
      {editablePlayerName}
      <span className="player-symbol">{symbol}</span>
      <button onClick={handleClick}>
        {isEditable ? "រក្សាទុក" : "កែប្រែ"}
      </button>
    </li>
  );
}
