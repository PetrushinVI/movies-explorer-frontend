import React from 'react';
import './MoviesCard.css';

function MoviesCard({ card, handleSelectionMovie, isSavedFilms, saved, savedMovies, onCardDelete }) {

  const saveButtonClassName = `${saved ? 'card__like card__like_type_active' : 'card__like'}`;

  function onCardClick() {
    if (saved) {
      onCardDelete(savedMovies.filter((m) => m.movieId === card.id)[0]);
    } else {
      handleSelectionMovie(card);
    }
  }

  function durationConverter(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  }

  function onDelete() {
    onCardDelete(card);
  }


  return(
    <li className='card'>
      <a href={card.trailerLink} target="_blank" rel="noreferrer">
      <img className='card__image' src={isSavedFilms ? card.image : `https://api.nomoreparties.co/${card.image.url}`} alt={card.nameRU}/>
      </a>
      <div className='card__description'>
        <h2 className='card__name'>{card.nameRU}</h2>
        {isSavedFilms ? (
          <button type="button" className="card__like card__like_type_delete" onClick={onDelete}></button>
        ) : (
          <button type="button" className={saveButtonClassName} onClick={onCardClick}></button>
        )}
      </div>
      <span className='card__duration'>{durationConverter(card.duration)}</span>
    </li>
  )
}

export default MoviesCard;