import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie }) {
  const { pathname } = useLocation();

  const duration = movie.duration;
  const hours = Math.floor(duration / 60);
  const minutes = Math.floor(duration) - hours * 60;

  const [isChecked, setisChecked] = React.useState(false);
  const [isRemoved, setisRemoved] = React.useState(false);

  function handleCardClick() {
    if (isChecked === false) {
      setisChecked(true);
    } else {
      setisChecked(false);
    }
  }

  // временное решение для этапа вёрстки
  function handleCardDelete() {
    setisRemoved(true);
  }

  return (
    <li className={`movies__card movie-card" ${isRemoved && 'movie-card_removed'}`}>
      <img src={movie.image} alt={movie.name} className="movie-card__image" />
      <div className="movie-card__block">
        <div className="movie-card__text">
          <h2 className="movie-card__name">{movie.name}</h2>
          <span className="movie-card__duration">
            {hours}ч{minutes}м.
          </span>
        </div>
        {pathname === '/movies' ? (
          <button
            type="button"
            className={`movie-card__button ${
              isChecked && 'movie-card__button_on'
            }`}
            onClick={handleCardClick}
          ></button>
        ) : (
          <button
            type="button"
            className={`movie-card__button movie-card__button_delete`}
            onClick={handleCardDelete}
          ></button>
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
