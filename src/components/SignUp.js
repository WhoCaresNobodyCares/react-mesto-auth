import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='auth'>
      <h2 className='auth__header'>Регистрация</h2>
      <form className='auth__form' id='signup-form' action='#' method='post' name='signup-form'>
        <input className='auth__input' type='url' name='email' id='email' placeholder='Email' required />
        <input className='auth__input' type='password' name='signup-password' id='signup-password' placeholder='Пароль' required />
        <button className='auth__button' type='submit'>
          Зарегистрироваться
        </button>
      </form>
      <span className='auth__text'>
        Уже зарегистрированы?
        <Link to='/sign-in' className='auth__link'>
          Войти
        </Link>
      </span>
    </div>
  );
};

export default SignUp;
