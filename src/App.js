import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import Die from "./Components/Die";

import "./Styles/style.css";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [counter, setCounter] = useState(0);
  const [prevCounter, setPrevCounter] = useState(0);

  useEffect(() => {
    const wonHeld = dice.every((die) => die.isHeld);
    const wonValue = dice.every((die) => die.value === dice[0].value);
    if (wonHeld && wonValue) {
      setTenzies(true);
      setTime(time)
    }
  }, [dice]);

  function allNewDice() {
    let arrDice = [];
    for (let i = 0; i < 10; i++) {
      let ranNum = Math.ceil(Math.random() * 6);
      arrDice.push({
        value: ranNum,
        isHeld: false,
        id: nanoid(),
      });
    }
    return arrDice;
  }

  const Roll = () => {
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
      setPrevCounter(counter);
      setCounter(-1);
      setTime(0)
    } else {
      setDice((prev) =>
        prev.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    }
  };

  const handleCount = () => {
    setCounter((prev) => prev + 1);
  };

  const holdDice = (id) => {
    setDice((prev) =>
      prev.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  };

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      onClick={() => holdDice(die.id)}
      isHeld={die.isHeld}
    />
  ));

  return (
    <main>
      <div className="title-container">
        <h1 className="title">Tenzies</h1>
        <p className="text">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="die-container">{diceElements}</div>

      <div className="footer">
        <div className="last">
          <h2 className="rollTitle">Pre Roll</h2>
          <p className="counter">{prevCounter}</p>
        </div>
        <button
          className="button"
          onClick={() => {
            Roll();
            handleCount();
          }}
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
        <div className="next">
          <h2 className="rollTitle">Roll</h2>
          <p className="counter">{counter}</p>
        </div>
      </div>

    </main>
  );
}
