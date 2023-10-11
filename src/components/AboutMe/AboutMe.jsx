import React from 'react';
import { Link } from 'react-router-dom';
import './AboutMe.css';
import pic from '../../images/about-me__pic.svg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__text">
          <h3 className="about-me__name">Виталий</h3>
          <h4 className="about-me__info">Фронтенд-разработчик, 30 лет</h4>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link
            to={'https://github.com/methoni'}
            target="_blank"
            className="about-me__link"
          >
            Github
          </Link>
        </div>
        <img src={pic} alt="Аватар" className="about-me__pic" />
      </div>
    </section>
  );
}

export default AboutMe;
