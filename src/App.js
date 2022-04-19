import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

import Die from './Components/Die'

import './Styles/style.css'


export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const wonHeld = dice.every(die => die.isHeld)
    const wonValue = dice.every(die => die.value === dice[0].value)
    if(wonHeld && wonValue){
      setTenzies(true)
    }
  }, [dice])

  function allNewDice() {
    let arrDice = []
    for(let i = 0; i < 10;i++){
      let ranNum = Math.ceil(Math.random() * 6)
      arrDice.push({ 
        value: ranNum, 
        isHeld: false,
        id: nanoid()
      })
    }
    return arrDice
  }

  const Roll = () => {
    if(tenzies){
      setDice(allNewDice())
      setTenzies(false)
    } else {
      setDice(prev => prev.map(die => die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}))
    }
  }

  const holdDice = (id) => {
    setDice(prev => prev.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
  }
  
  const diceElements = dice.map(die => (
    <Die 
      key={die.id}
      value={die.value}
      onClick={() => holdDice(die.id)}
      isHeld= {die.isHeld}
    />
  ))

  return(
    <main>
      <div className='title-container'>
        <h1 className='title'>Tenzies</h1>
        <p className='text'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="die-container">
        {diceElements}
      </div>
      <button className='button' onClick={Roll}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}