import React from 'react';

const SignIn = () => {
  return (
    <div className='auth'>
      <h2 className='auth__header'>Вход</h2>
      <form className='auth__form' id='signin-form' action='#' method='post' name='signin-form'>
        <input className='auth__input' type='url' name='email' id='email' placeholder='Email' required />
        <input className='auth__input' type='password' name='signin-password' id='signin-password' placeholder='Пароль' required />
        <button className='auth__button auth__button_signin' type='submit'>
          Войти
        </button>
      </form>
    </div>
  );
};

export default SignIn;
