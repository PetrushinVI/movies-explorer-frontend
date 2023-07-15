import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { filterMovies, filterDuration } from '../../utils/utils';
import * as movies from '../../utils/MoviesApi';


function Movies({ loggedIn, handleSelectionMovie, savedMovies, onCardDelete }) {

  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setInitialMovies(movies);
      if (localStorage.getItem('shortMovies') === 'true') {
        setFilteredMovies(filterDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('movieSearch')) {
      if (filteredMovies.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    } else {
      setNotFound(false);
    }
  }, [filteredMovies]);

  function handleSearchMovies(query) {
    localStorage.setItem('movieSearch', query);
    localStorage.setItem('shortMovies', shortMovies);

    if (localStorage.getItem('allMovies')) {
      const movies = JSON.parse(localStorage.getItem('allMovies'));
      handleFilterMovies(movies, query, shortMovies);
    } else {
      setLoading(true);
      movies
        .getCards()
        .then((cards) => {
          handleFilterMovies(cards, query, shortMovies);
          setRequestError(false);
        })
        .catch(() => {
          setRequestError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function handleFilterMovies(movies, query, short) {
    const moviesList = filterMovies(movies, query, short);
    setInitialMovies(moviesList);
    setFilteredMovies(short ? filterDuration(moviesList) : moviesList);
    localStorage.setItem('allMovies', JSON.stringify(movies));
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  function handleShortMovies() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      if (filterDuration(initialMovies).length === 0) {
        setFilteredMovies(filterDuration(initialMovies));
      } else {
        setFilteredMovies(filterDuration(initialMovies));
      }
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('shortMovies', !shortMovies);
  }

  return(
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <section className='movies'>
          <SearchForm
            handleSearchMovies={handleSearchMovies}
            onFilter={handleShortMovies}
            shortMovies={shortMovies} />
          <MoviesCardList
            cards={filteredMovies}
            loading={loading}
            savedMovies={savedMovies}
            isSavedFilms={false}
            handleSelectionMovie={handleSelectionMovie}
            onCardDelete={onCardDelete}
            requestError={requestError}
            notFound={notFound} />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Movies;