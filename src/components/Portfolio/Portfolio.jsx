import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio page__portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <nav className="portfolio__nav">
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a
              href="https://github.com/methoni/how-to-learn"
              target="_blank"
              className="portfolio__link"
            >
              <p className="portfolio__project">Статичный сайт</p>
              <button type="button" className="portfolio__button"></button>
            </a>
          </li>
          <li className="portfolio__item">
            <a
              href="https://github.com/methoni/russian-travel"
              target="_blank"
              className="portfolio__link"
            >
              <p className="portfolio__project">Адаптивный сайт</p>
              <button type="button" className="portfolio__button"></button>
            </a>
          </li>
          <li className="portfolio__item">
            <a
              href="https://github.com/methoni/react-mesto-auth"
              target="_blank"
              className="portfolio__link"
            >
              <p className="portfolio__project">Одностраничное приложение</p>
              <button type="button" className="portfolio__button"></button>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;
