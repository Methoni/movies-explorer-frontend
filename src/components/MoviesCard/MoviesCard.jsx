import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ cardData, checkMovie, deleteMovie, savedMovies }) {
  const { pathname } = useLocation();

  const duration = cardData.duration;
  const hours = Math.floor(duration / 60);
  const minutes = Math.floor(duration) - hours * 60;

  const [isChecked, setisChecked] = React.useState(false);
  const [isRemoved, setisRemoved] = React.useState(false);
  const [src, setSrc] = React.useState('');

  React.useEffect(() => {
    setisChecked(savedMovies.some((movie) => cardData.id === movie.movieId));
  }, [savedMovies, cardData.id, setisChecked]);

  function handleCardClick() {
    if (!isChecked) {
      setisChecked(true);
      checkMovie(cardData);
    } else {
      setisChecked(false);
      checkMovie(cardData);
    }
  }

  function onDelete() {
    deleteMovie(cardData._id);
    setisRemoved(true);
  }

  React.useEffect(() => {
    if (pathname === '/movies') {
      setSrc(`https://api.nomoreparties.co${cardData.image.url}`);
    } else {
      setSrc(cardData.image);
    }
  }, [pathname, cardData.image]);

  function handleImageClick(event) {
    event.preventDefault();
    window.open(`${cardData.trailerLink}`, '_blank');
  }

  return (
    <li
      className={`movies__card movie-card" ${
        isRemoved && 'movie-card_removed'
      }`}
    >
      <img
        src={src}
        alt={cardData.nameRU}
        className="movie-card__image"
        onClick={handleImageClick}
      />
      <div className="movie-card__block">
        <div className="movie-card__text">
          <h2 className="movie-card__name">{cardData.nameRU}</h2>
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
            onClick={onDelete}
          ></button>
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
