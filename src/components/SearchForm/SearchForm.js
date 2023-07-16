import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm({ handleSearchMovies, onFilter, shortMovies }) {

  const location = useLocation();
  const [query, setQuery] = useState('');
  const [queryError, setQueryError] = useState(false);

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem('movieSearch')) {
      const localQuery = localStorage.getItem('movieSearch');
      setQuery(localQuery);
    }
  }, [location]);

  function handleChangeQuery(env) {
    setQuery(env.target.value);
  }

  function handleSubmit(env) {
    env.preventDefault();
    if (query.trim().length === 0) {
      setQueryError(true);
    } else {
      setQueryError(false);
      handleSearchMovies(query);
    }
  }


  return(
    <section className='search-form'>
      <div className='search-form__container'>
        <form className='search-form__form' onSubmit={handleSubmit} id='form'>
          <input
            placeholder='Фильм'
            className='search-form__input'
            onChange={handleChangeQuery}
            value={query || ''}
            formNoValidate>
          </input>
          <button className='search-form__button' type='submit'>Поиск</button>
        </form>
      </div>
      {queryError && <span className="search-form__error">Необходимо ввести ключевое слово</span>}
      <FilterCheckbox onFilter={onFilter} shortMovies={shortMovies}/>
    </section>
  )
}

export default SearchForm;