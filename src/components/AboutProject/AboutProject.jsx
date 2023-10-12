import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="page__about-project about-project" id={"about-project"}>
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__container">
        <h3 className="about-project__subtitle">
          Дипломный проект включал 5 этапов
        </h3>
        <h3 className="about-project__subtitle">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="about-project__text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <p className="about-project__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="about-project__timeline">
        <p className="about-project__time about-project__time_backend">
          1 неделя
        </p>
        <p className="about-project__time about-project__time_frontend">
          4 недели
        </p>
        <span className="about-project__capture">Back-end</span>
        <span className="about-project__capture">Front-end</span>
      </div>
    </section>
  );
}

export default AboutProject;
