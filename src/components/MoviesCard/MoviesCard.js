import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import cardImage from '../../images/card.jpg';


function MoviesCard() {

  const location = useLocation();
  const [liked, setLiked] = useState(false);

  return(
    <li className='card'>
      <img className='card__image' src={cardImage} alt='Изображение карточки'/>
      <div className='card__description'>
        <h2 className='card__name'>33 слова о дизайне</h2>
        <button
          className={`card__like ${
            location.pathname === '/movies'
              ? `card__like ${liked ? 'card__like_type_active' : ''}`
              : 'card__like_type_delete'
          }`}
          type='button'
          onClick={() => (!liked ? setLiked(true) : setLiked(false))}
        />
      </div>
      <span className='card__duration'>1ч42м</span>
    </li>
  )
}

export default MoviesCard;