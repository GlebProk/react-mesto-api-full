import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {

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

        onRegister({
            password,
            email
        });
    }

    return (
        <div className="form form_register">
            <form className="form__container" id="Register" onSubmit={handleSubmit}>
                <h2 className="form__title">Регистрация</h2>
                <input
                    className="form__input form__input_email"
                    type="text"
                    id="userEmail"
                    placeholder="Email"
                    onChange={handleInputEmail}
                    value={email || ''}
                    required
                />
                <input
                    className="form__input form__input_pass"
                    type="password"
                    id="userPass"
                    placeholder="Пароль"
                    onChange={handleInputPassword}
                    value={password || ''}
                    required
                />
                <button className="form__button-register" type="submit" aria-label="Save">Зарегистрироваться</button>
                <span className="form__span">Уже зарегистрированы? <Link to="/signin" className="form__span-link">Войти</Link></span>
            </form>
        </div>
    )
}

export default Register;
