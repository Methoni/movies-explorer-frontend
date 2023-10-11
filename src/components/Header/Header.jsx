import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header({ name, loggedIn }) {
  const { pathname } = useLocation();
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

  function handleBurgerClick() {
    setIsBurgerOpen(true);
  }

  function handleCloseIconClick() {
    setIsBurgerOpen(false);
  }

  return (
    <header className={`header ${name !== 'main' ? 'header_black' : ''}`}>
      <div>
        <Link
          to={'/'}
          className={`header__logo header__link ${
            pathname === '/' ? 'header__link_disabled' : ''
          }`}
        ></Link>
      </div>

      {name === 'main' && !loggedIn ? (
        <nav>
          <ul className="header__links">
            <li>
              <Link to={'/signup'} className="header__signup header__link">
                Регистрация
              </Link>
            </li>
            <li>
              <Link to={'/signin'} className="header__signin header__link">
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <>
          <nav
            className={`header__nav_auth ${
              isBurgerOpen && 'header__side-menu'
            }`}
          >
            <ul
              className={`${
                isBurgerOpen ? 'header__side-menu_links' : 'header__links_auth'
              }`}
            >
              <li className="header__link_wrap">
                <Link
                  to={'/'}
                  className={`header__main header__link_auth ${
                    pathname === '/' ? 'header__link_disabled' : ''
                  }`}
                >
                  Главная
                </Link>
              </li>

              <li className="header__link_wrap">
                <Link
                  to={'/movies'}
                  className={`header__movies header__link_auth ${
                    pathname === '/movies' ? 'header__link_disabled' : ''
                  }`}
                >
                  Фильмы
                </Link>
              </li>
              <li className="header__link_wrap">
                <Link
                  to={'/saved-movies'}
                  className={`header__saved header__link_auth ${
                    pathname === '/saved-movies' ? 'header__link_disabled' : ''
                  }`}
                >
                  Сохранённые фильмы
                </Link>
              </li>

              <li className="header__link_wrap">
                <Link
                  to={'/profile'}
                  className="header__profile header__link_auth"
                >
                  Аккаунт{' '}
                  <div
                    className={`header__icon ${
                      name !== 'main' ? 'header__icon_black' : ''
                    }`}
                  ></div>
                </Link>
              </li>
            </ul>

            <button
              type="button"
              className="header__close"
              onClick={handleCloseIconClick}
            ></button>
          </nav>
          <button
            type="button"
            className="header__burger"
            onClick={handleBurgerClick}
          ></button>
        </>
      )}
    </header>
  );
}

export default Header;
