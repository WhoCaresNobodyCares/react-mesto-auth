import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = props => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignUp = e => {
    e.preventDefault();
    props.onSignup(password, email);
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className='auth'>
      <h2 className='auth__header'>Регистрация</h2>
      <form className='auth__form' id='signup-form' action='#' method='post' name='signup-form' onSubmit={handleSignUp}>
        <input
          className='auth__input'
          type='email'
          name='email'
          id='email'
          placeholder='Email'
          onChange={handleEmailChange}
          value={email || ''}
          required
        />
        <input
          className='auth__input'
          type='password'
          name='signup-password'
          id='signup-password'
          placeholder='Пароль'
          onChange={handlePasswordChange}
          value={password || ''}
          required
        />
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
