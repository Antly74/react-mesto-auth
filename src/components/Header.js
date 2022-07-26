import logo from '../images/logo.svg';
import { Route, Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Header() {

  const currentUser = useContext(CurrentUserContext);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function handleMenuButtonClick(e) {
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <header className="header">
      {menuIsOpen && (
        <div className="header__burger-menu">
          <p className="header__login">{currentUser.email}</p>
          <Link to="/sign-out" className="header__link header__text link" onClick={() => setMenuIsOpen(false)}>Выйти</Link>
        </div>
      )}
      <div className="header__main">
        <a href="#" className="header__link link">
          <img src={logo} alt="Место" className="header__logo" />
        </a>
          <Route path="/sign-in">
            <nav className="header__nav">
              <Link to="/sign-up" className="header__link header__text link" >Регистрация</Link>
            </nav>
          </Route>
          <Route path="/sign-up">
            <nav className="header__nav">
              <Link to="/sign-in" className="header__link header__text link">Войти</Link>
            </nav>
          </Route>
          <Route exact path="/">
            <nav className="header__nav header__nav-burger">
              <p className="header__login">{currentUser.email}</p>
              <Link to="/sign-out" className="header__link header__text link">Выйти</Link>
            </nav>
          </Route>
        <Route exact path="/">
          <button
            aria-label="Меню"
            type="button"
            className={`${menuIsOpen ? 'header__close-button' : 'header__burger-button'} link`}
            onClick={handleMenuButtonClick}
          />
        </Route>
      </div>
    </header>
  );
}

export default Header;
