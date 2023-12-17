import { useState } from "react";
import { nanoid } from "nanoid";
import Die from "./Die";
import "./App.css";

function App() {
    const [dice, setDice] = useState(allNewDice());

    function generateNewDie() {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
        };
    }

    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie());
        }
        return newDice;
    }

    function holdDice(id) {
        setDice((prevDice) =>
            prevDice.map((die) => {
                if (die.id === id) {
                    return { ...die, isHeld: !die.isHeld };
                } else {
                    return die;
                }
            })
        );
    }

    function rollDice() {
        setDice((prevDice) =>
            prevDice.map((die) => (die.isHeld ? die : generateNewDie()))
        );
    }

    const diceElements = dice.map((die) => {
        return (
            <Die
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                holdDice={() => holdDice(die.id)}
            />
        );
    });

    return (
        <main>
            <div className="dice-container">{diceElements}</div>
            <button className="roll-dice" onClick={rollDice}>
                Roll Dice
            </button>
        </main>
    );
}

export default App;
