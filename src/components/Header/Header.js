import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg'
import Navigation from '../Navigation/Navigation';
import AccountButton from '../AccountButton/AccountButton';


function Header({ loggedIn }) {

  const [clicked, setClicked] = useState(false);

  function handleOpenMenu() {
    setClicked(true);
  }

  function handleCloseMenu() {
    setClicked(false);
  }

  return(
    <>
      {!loggedIn ? (
        <header className='header'>
          <Link to='/' className='header__logo'>
            <img src={logo} alt='Логотип' />
          </Link>
          <div className='header__button-container'>
            <Link to='/signup' className='header__button'>
              Регистрация
            </Link>
            <Link to='/signin' className='header__button header__login-button'>
              Войти
            </Link>
          </div>
        </header>
      ) : (
        <header className='header'>
          <Link to='/' className='header__logo'>
            <img src={logo} alt='логотип' />
          </Link>
          <nav className='header__nav'>
            <div className='header__movies-container'>
              <Link to='/movies' className='header__link'>
                Фильмы
              </Link>
              <Link to='/saved-movies' className='header__link'>
                Сохранённые фильмы
              </Link>
            </div>
            <div className='header__account-button'>
              <AccountButton />
            </div>
          </nav>
          <button className='header__burger-button' onClick={handleOpenMenu} ></button>
          {clicked ? <Navigation handleCloseMenu={handleCloseMenu} /> : ''}
        </header>
      )}
    </>
  )
}

export default Header;