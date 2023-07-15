import React from 'react';
import './FilterCheckbox.css';


function FilterCheckbox({ onFilter, shortMovies }) {

  return(
    <form className="filter">
      <input
        type="checkbox"
        className="filter__checkbox"
        onChange={onFilter}
        checked={shortMovies}>
      </input>
      <span className="filter__text">Короткометражки</span>
    </form>
  )
}

export default FilterCheckbox;