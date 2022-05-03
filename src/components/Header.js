import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import logoPath from '../images/header__logo.svg';

const Header = props => {
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
        <Route
          path='/'
          element={
            <div>
              <span className='header__user'>{props.email}</span>
              <button className='header__logout' onClick={props.logout}>
                Выйти
              </button>
            </div>
          }
        />
      </Routes>
    </header>
  );
};

export default Header;
