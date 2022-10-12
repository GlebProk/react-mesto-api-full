import logo from '../images/logo.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header({ email, onSignOut}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип MestoRussia" />
      <Switch>

        <Route exact path="/">
          <div className="header__info">
            <p className="header__email">{email}</p>
            <Link to='/signin' className="header__link" onClick={onSignOut}>Выйти</Link>
          </div>
        </Route>

        <Route path="/signin">
          <Link to="/signup" className="header__link">Регистрация</Link>
        </Route>

        <Route path="/signup">
          <Link to="/signin" className="header__link">Войти</Link>
        </Route>

      </Switch>
    </header>
  )
}

export default Header;
