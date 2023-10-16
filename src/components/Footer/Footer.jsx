import React from 'react';
import './Footer.css';

function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className="footer page__footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__date">&copy; {date}</p>
        <nav className="footer__nav">
          <a
            href="https://practicum.yandex.ru/"
            target="_blank"
            className="footer__link"
          >
            Яндекс.Практикум
          </a>
          <a
            href="https://github.com/methoni"
            target="_blank"
            className="footer__link"
          >
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
