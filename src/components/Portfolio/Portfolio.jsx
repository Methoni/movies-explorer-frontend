import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <nav className="portfolio__nav">
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <Link
              to={'https://github.com/methoni/how-to-learn'}
              target="_blank"
              className="portfolio__link"
            >
              <p className="portfolio__project">Статичный сайт</p>
            </Link>
            <button type="button" className="portfolio__button"></button>
          </li>
          <li className="portfolio__item">
            <Link
              to={'https://github.com/methoni/russian-travel/'}
              target="_blank"
              className="portfolio__link"
            >
              <p className="portfolio__project">Адаптивный сайт</p>
            </Link>
            <button type="button" className="portfolio__button"></button>
          </li>
          <li className="portfolio__item">
            <Link
              to={'https://github.com/methoni/react-mesto-auth/'}
              target="_blank"
              className="portfolio__link"
            >
              <p className="portfolio__project">Одностраничное приложение</p>
            </Link>
            <button type="button" className="portfolio__button"></button>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;
