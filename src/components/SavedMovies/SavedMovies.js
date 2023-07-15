import React, { useState, useEffect } from 'react';
import '../Movies/Movies.css';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import { filterMovies, filterDuration } from '../../utils/utils';


function SavedMovies({ loggedIn, savedMovies, onCardDelete }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [shortMovies, setShortMovies] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const moviesList = filterMovies(savedMovies, searchQuery);
    setFilteredMovies(shortMovies ? filterDuration(moviesList) : moviesList);
  }, [savedMovies, shortMovies, searchQuery]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [filteredMovies]);

  function handleSearchMovies(query) {
    setSearchQuery(query);
  }

  function handleShortMovies() {
    setShortMovies(!shortMovies);
  }


  return(
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <section className='movies'>
          <SearchForm handleSearchMovies={handleSearchMovies} onFilter={handleShortMovies} />
          <MoviesCardList
            notFound={notFound}
            cards={filteredMovies}
            isSavedFilms={true}
            savedMovies={savedMovies}
            onCardDelete={onCardDelete} />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;