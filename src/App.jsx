import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die";
import "./App.css";

function App() {
    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);

    useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const allSame = dice.every((die) => die.value === dice[0].value);

        if (allHeld && allSame) setTenzies(true);
    }, [dice]);

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
        if (!tenzies) {
            setDice((prevDice) =>
                prevDice.map((die) => (die.isHeld ? die : generateNewDie()))
            );
        } else {
            setTenzies(false);
            setDice(allNewDice());
        }
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
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="dice-container">{diceElements}</div>
            <button className="roll-dice" onClick={rollDice}>
                {tenzies ? "New Game" : "Roll Dice"}
            </button>
        </main>
    );
}

export default App;
