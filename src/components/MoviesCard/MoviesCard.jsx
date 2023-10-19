import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ cardData, addMovie }) {
  const { pathname } = useLocation();

  const duration = cardData.duration;
  const hours = Math.floor(duration / 60);
  const minutes = Math.floor(duration) - hours * 60;

  const [isChecked, setisChecked] = React.useState(false);

  function handleCardClick() {
    if (!isChecked) {
      setisChecked(true);
      addMovie(cardData);
    } else {
      setisChecked(false);
      addMovie(cardData);
    }
  }

  function handleImageClick(event) {
    event.preventDefault();
    window.open(`${cardData.trailerLink}`, '_blank');
  }

  return (
    <li className="movies__card movie-card">
      <img
        src={`https://api.nomoreparties.co${cardData.image.url}`}
        alt={cardData.name}
        className="movie-card__image"
        onClick={handleImageClick}
      />
      <div className="movie-card__block">
        <div className="movie-card__text">
          <h2 className="movie-card__name">{cardData.name}</h2>
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
            onClick={handleCardClick}
          ></button>
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
