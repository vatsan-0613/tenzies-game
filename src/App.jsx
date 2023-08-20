import Die from "./Die";
import React from "react";
import {nanoid} from "nanoid";
import Confetti from "./Confetti";

export default function App() {

  const [state, setState] = React.useState(generateNumbers());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(function(){
    const resSet = new Set();
    state.forEach(item =>{
      resSet.add(item.value);
      resSet.add(item.isHeld);
    })
    if(resSet.size===2){
      setTenzies(true)
      console.log("won the game");
    } 
    console.log('state changed');
  }, [state])

  function holdDice(id){
    const newItems = state.map(item =>{
      return(
        item.id==id?{...item, isHeld : !item.isHeld}:item
      )
    })
    setState(newItems);
  }

  function rollDice(){
    setState(prevItems => prevItems.map(item =>{
        return(
          item.isHeld? item : {...item, value :  Math.floor(Math.random() * 6 + 1)}
        )
      }))
  }

  function newGame(){
    setState(generateNumbers);
    setTenzies(false);
  }

  function generateNumbers() {
    const array = [];
    for (let i = 0; i <= 9; i++) {
      const roll = {
        value : Math.floor(Math.random() * 6 + 1),
        isHeld : false,
        id : nanoid()
      }
      array.push(roll);
      // array.push(Math.floor(Math.random() * 6 + 1));
    }
    return array;
  }

  // function rollDice(){
  //   setState(generateNumbers());
  // }

  return (
    <main>
      {tenzies&& <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="desc">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">
      {state.map((item) => (
        <Die value={item.value} isHeld={item.isHeld} key={item.id} id={item.id} hold={holdDice}/>
      ))}
      </div>
      <button className="roll-btn" onClick={tenzies?newGame:rollDice}>
        {tenzies?"New Game":"Roll"}
      </button>
    </main>
  );
}
