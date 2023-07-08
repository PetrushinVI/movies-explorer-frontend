import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import AccountButton from '../AccountButton/AccountButton';

function Navigation() {
  return (
    <div className='navigation'>
      <div className="navigation__overlay"></div>
      <div className='navigation__container'>
        <button className='navigation__close-button'></button>
        <nav className="navigation__nav">
          <Link to="/"  className="navigation__link">
            Главная
          </Link>
          <Link to="/movies"  className="navigation__link">
            Фильмы
          </Link>
          <Link to="/saved-movies"  className="navigation__link">
            Сохранённые фильмы
          </Link>
        </nav>
        <Link to='/profile' className='navigation__account-button'>
          <AccountButton />
        </Link>
      </div>
    </div>
  );
}

export default Navigation;