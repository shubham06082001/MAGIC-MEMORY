import React from 'react';
import './SingleCard.css';

import coverImage from '../img/cover.png';

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div key={card.id} className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <img className='front' src={card.src} alt='card front' />
        <img
          className='back'
          onClick={handleClick}
          src={coverImage}
          alt='card back'
        />
      </div>
    </div>
  );
};

export default SingleCard;
