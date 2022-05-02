import React from 'react';

const SignIn = props => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignIn = e => {
    e.preventDefault();
    props.onSignin(password, email);
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  return (
    <div className='auth'>
      <h2 className='auth__header'>Вход</h2>
      <form className='auth__form' id='signin-form' action='#' method='post' name='signin-form' onSubmit={handleSignIn}>
        <input className='auth__input' type='email' name='email' id='email' placeholder='Email' onChange={handleEmailChange} required />
        <input
          className='auth__input'
          type='password'
          name='signin-password'
          id='signin-password'
          placeholder='Пароль'
          onChange={handlePasswordChange}
          required
        />
        <button className='auth__button auth__button_signin' type='submit'>
          Войти
        </button>
      </form>
    </div>
  );
};

export default SignIn;
