import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import './MoviesCardList.css';

function MoviesCardList({ movies }) {
  const [isChecked, setIsChecked] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState(movies);
  const [publishedMovies, setPublishedMovies] = React.useState(
    publishMovies().base
  );

  function handleCheckBoxClick() {
    if (isChecked === false) {
      setIsChecked(true);
      setFilteredMovies(
        filteredMovies.filter((element) => element.duration <= 40)
      );
    } else {
      setIsChecked(false);
      setFilteredMovies(movies);
    }
  }

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
    <>
      <SearchForm
        isChecked={isChecked}
        handleCheckBoxClick={handleCheckBoxClick}
      />
      <section className="movies">
        <ul className="movies__list">
          {filteredMovies.slice(0, publishedMovies).map((movie) => (
            <MoviesCard movie={movie} key={movie.id} />
          ))}
        </ul>
        <button
          type="button"
          className={`movies__more ${
            publishedMovies >= movies.length && 'movies__more_hidden'
          }`}
          onClick={addMore}
        >
          Ещё
        </button>
      </section>
    </>
  );
}

export default MoviesCardList;
