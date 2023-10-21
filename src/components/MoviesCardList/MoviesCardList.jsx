import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

function MoviesCardList({
  checkMovie,
  deleteMovie,
  isEmpty,
  isSearched,
  isLoading,
  isSearchError,
  savedMovies,
  filteredMovies,
  isChecked,
  handleCheckBoxClick,
  searchMovies,
}) {
  const [publishedMovies, setPublishedMovies] = React.useState(
    publishMovies().base
  );

  function publishMovies() {
    const counter = {};
    if (window.innerWidth >= 1024) {
      counter.base = 16;
      counter.step = 4;
    }
    if (window.innerWidth <= 1023) {
      counter.base = 12;
      counter.step = 3;
    }
    if (window.innerWidth <= 768) {
      counter.base = 8;
      counter.step = 2;
    }
    if (window.innerWidth <= 480) {
      counter.base = 5;
      counter.step = 2;
    }
    return counter;
  }

  function addMore() {
    setPublishedMovies(publishedMovies + publishMovies().step);
  }

  return (
    <main className="main page__movies movies">
      <SearchForm
        isChecked={isChecked}
        handleCheckBoxClick={handleCheckBoxClick}
        searchMovies={searchMovies}
      />
      <section className="movies__section">
        {isLoading ? (
          <Preloader />
        ) : (
          !isEmpty && (
            <>
              <ul className="movies__list">
                {filteredMovies.slice(0, publishedMovies).map((cardData) => (
                  <MoviesCard
                    cardData={cardData}
                    key={cardData.id}
                    checkMovie={checkMovie}
                    deleteMovie={deleteMovie}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <button
                type="button"
                className={`movies__more ${
                  publishedMovies >= filteredMovies.length &&
                  'movies__more_hidden'
                }`}
                onClick={addMore}
              >
                Ещё
              </button>
            </>
          )
        )}
        <span
          className={`${
            isSearchError ? 'movies__error' : 'movies__error_hidden'
          }`}
        >
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз.
        </span>
        <span
          className={`${
            filteredMovies <= 0 && isSearched && !isLoading
              ? 'movies__error'
              : 'movies__error_hidden'
          }`}
        >
          Ничего не найдено.
        </span>
      </section>
    </main>
  );
}

export default MoviesCardList;
