import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchError from '../SearchError/SearchError';
import Preloader from '../Preloader/Preloader';
import { SHOW_MORE_SMALL_WIDTH, SHOW_MORE_MIDDLE_WIDTH, SHOW_MORE_LARGE_WIDTH } from '../../utils/constants';


function MoviesCardList({ loading, cards, handleSelectionMovie, isSavedFilms, savedMovies, onCardDelete, requestError, notFound }) {

  const { pathname } = useLocation();
  const [shownMovies, setShownMovies] = useState(0);

  useEffect(() => {
    shownCountMovies();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', shownCountMovies);
    }, 500);

    return () => {
      setTimeout(() => {
        window.removeEventListener('resize', shownCountMovies);
      });
    }
  });

  function shownCountMovies() {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1200) {
      setShownMovies(16);
    } else if (windowWidth > 928) {
      setShownMovies(12);
    } else if (windowWidth > 761) {
      setShownMovies(8);
    } else if (windowWidth <= 761) {
      setShownMovies(5);
    }
  }

  function showMoreMovies() {
    const windowWidth = window.innerWidth;
    if (windowWidth > 1200) {
      setShownMovies(shownMovies + SHOW_MORE_LARGE_WIDTH);
    } else if (windowWidth > 928) {
      setShownMovies(shownMovies + SHOW_MORE_MIDDLE_WIDTH);
    } else if (windowWidth > 761) {
      setShownMovies(shownMovies + SHOW_MORE_SMALL_WIDTH);
    }
    else if (windowWidth <= 761) {
      setShownMovies(shownMovies + SHOW_MORE_SMALL_WIDTH);
    }
  }

  function getSavedMovie(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
  }


  return(
    <>
      {loading && <Preloader />}
      {notFound && !loading && <SearchError errorText={'Ничего не найдено'} />}
      {requestError && !loading && (<SearchError errorText={'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'}/>)}
      {!loading && !requestError && !notFound && (
        <>
          {pathname === '/saved-movies' ? (
            <>
              <ul className="movies__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    cards={cards}
                    card={card}
                    saved={getSavedMovie(savedMovies, card)}
                    isSavedFilms={isSavedFilms}
                    handleSelectionMovie={handleSelectionMovie}
                    savedMovies={savedMovies}
                    onCardDelete={onCardDelete}
                  />
                ))}
              </ul>
              <div className='movies__button-container'></div>
            </>
          ) : (
            <>
              <ul className="movies__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    cards={cards}
                    card={card}
                    saved={getSavedMovie(savedMovies, card)}
                    isSavedFilms={isSavedFilms}
                    handleSelectionMovie={handleSelectionMovie}
                    savedMovies={savedMovies}
                    onCardDelete={onCardDelete}
                  />
                ))}
              </ul>
              <div className='movies__button-container'>
                {cards.length > shownMovies ? (
                  <button className="movies__button" onClick={showMoreMovies}>
                    Ещё
                  </button>
                ) : (
                  ''
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

export default MoviesCardList;