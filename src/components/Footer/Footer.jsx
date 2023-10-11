import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__date">&copy; {date}</p>
        <nav className="footer__nav">
          <Link
            to={'https://practicum.yandex.ru/'}
            target="_blank"
            className="footer__link"
          >
            Яндекс.Практикум
          </Link>
          <Link
            to={'https://github.com/methoni'}
            target="_blank"
            className="footer__link"
          >
            Github
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
