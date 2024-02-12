import { useState } from "react";
export default function Player({ intialname, symbol,isActive,onChangeName }) {
    const[playersName, setPlayerName] = useState(intialname);
    const [isEdit, setIsEdit] = useState(false);
    function editPlayerName() {
        setIsEdit((editing) => !editing);
        if (isEdit) {
         onChangeName(symbol, playerName);
        }
    }
    function handleChange(event) {
        setPlayerName(event.target.value);
    }
    let playerName = <span className="player-name">{playersName}</span>;
    if (isEdit) {
        playerName = <input type="text" required value={playersName} onChange={handleChange}/>;
    }
    return (
      <li className={isActive ? 'active':undefined}>
        <span className="player">
          {playerName}
          <span className="player-symbol">{symbol}</span>
        </span>
            <button onClick={editPlayerName}>{ isEdit ? 'Save' : 'Edit'}</button>
      </li>
    );
} 