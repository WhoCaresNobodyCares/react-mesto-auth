import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import logoPath from '../images/header__logo.svg';

const Header = () => {
  return (
    <header className='header body__header'>
      <a href='#' className='header__link'>
        <img src={logoPath} alt='Лого' className='header__logo' />
      </a>
      <Routes>
        <Route
          path='/sign-up'
          element={
            <Link to='/sign-in' className='header__nav'>
              Войти
            </Link>
          }
        ></Route>
        <Route
          path='/sign-in'
          element={
            <Link to='/sign-up' className='header__nav'>
              Зарегистрироваться
            </Link>
          }
        ></Route>
      </Routes>
    </header>
  );
};

export default Header;
