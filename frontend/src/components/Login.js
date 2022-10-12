import React from 'react';

function Login({ onLogin }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleInputEmail(e) {
    setEmail(e.target.value);
  }

  function handleInputPassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onLogin({
      password,
      email
    });
  }

  return (
    <div className="form form_register">
      <form className="form__container" id="Register" onSubmit={handleSubmit}>
        <h2 className="form__title">Вход</h2>
        <input
          className="form__input form__input_email"
          type="text"
          id="userEmail"
          placeholder="Email"
          onChange={handleInputEmail}
          value={email || ''}
        />
        <input
          className="form__input form__input_pass"
          type="password"
          id="userPass"
          placeholder="Пароль"
          onChange={handleInputPassword}
          value={password || ''}
        />
        <button className="form__button-register" type="submit" aria-label="Save">Войти</button>
      </form>
    </div>
  )
}

export default Login;
