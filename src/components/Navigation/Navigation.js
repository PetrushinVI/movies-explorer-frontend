import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import AccountButton from '../AccountButton/AccountButton';

function Navigation({ handleCloseMenu }) {

  return (
    <div className='navigation'>
      <div className="navigation__overlay" onClick={handleCloseMenu}></div>
      <div className='navigation__container'>
        <button className='navigation__close-button' onClick={handleCloseMenu}></button>
        <nav className="navigation__nav">
          <NavLink
            exact
            to="/"
            className="navigation__link"
            activeClassName="navigation__link_active"
            onClick={handleCloseMenu}>
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className="navigation__link"
            activeClassName="navigation__link_active"
            onClick={handleCloseMenu}>
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="navigation__link"
            activeClassName="navigation__link_active"
            onClick={handleCloseMenu}>
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to='/profile' className='navigation__account-button' onClick={handleCloseMenu} >
          <AccountButton />
        </Link>
      </div>

    </div>
  );
}

export default Navigation;