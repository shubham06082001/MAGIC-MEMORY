import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

import helmetImage from './img/helmet-1.png';
import potionImage from './img/potion-1.png';
import ringImage from './img/ring-1.png';
import scrollImage from './img/scroll-1.png';
import shieldImage from './img/shield-1.png';
import swordImage from './img/sword-1.png';

import matchCorrect from './Sounds/dingcorrect.wav';
import shuffle from './Sounds/shuffle.wav';
import cardFlip from './Sounds/cardflip.wav';
import matchWrong from './Sounds/dingwrong.wav';

const cardImages = [
  { src: helmetImage, matched: false },
  { src: potionImage, matched: false },
  { src: ringImage, matched: false },
  { src: scrollImage, matched: false },
  { src: shieldImage, matched: false },
  { src: swordImage, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  let match = new Audio(matchCorrect);
  let flip = new Audio(cardFlip);
  let shuffle_cards = new Audio(shuffle);
  let wrong = new Audio(matchWrong);
  // match.play();

  const recordTime = 0;

  // shuffle cards

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);

    setCards(shuffledCards);
    setTurns(0);
    shuffle_cards.play();
  };

  const gameOver = () => {
    // cardImages.filter((card) => !card.matched).length === 0;
    // setCounter(0);
    // FIXME: add game over screen && change timer and reset game
  };

  // handle choice

  const handleChoice = (card) => {
    // console.log(card)

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      const isMatch = choiceOne.src === choiceTwo.src;

      setDisabled(true);

      if (isMatch) {
        console.log('match');
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
        match.play();
      } else {
        setTimeout(
          () => resetTurn(),
          // console.log('no match')
          1000
        );
        wrong.play();
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choice & increase turns

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((turns) => turns + 1);
    setDisabled(false);
  };

  //TODO: TIMER

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer =
      counter >= 0 && setInterval(() => setCounter(counter + 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='board'>
        <p>Turns: {turns}</p>
        <p>Countdown: {counter}</p>
      </div>
      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
