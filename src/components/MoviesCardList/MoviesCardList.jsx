import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

function MoviesCardList({ movies, addMovie, isLoading }) {
  const [isChecked, setIsChecked] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState('');
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [publishedMovies, setPublishedMovies] = React.useState(
    publishMovies().base
  );
  const [isEmpty, setIsEmpty] = React.useState(true);

  function handleCheckBoxClick() {
    if (isChecked === false) {
      setIsChecked(true);
      filterMovies(searchResult, true, movies);
    } else {
      setIsChecked(false);
      filterMovies(searchResult, false, movies);
    }
  }

  function searchMovies(searchRequest) {
    filterMovies(searchRequest, isChecked, movies);
    if (movies.length > 0) {
      setIsEmpty(false);
    }
  }

  const filterMovies = React.useCallback((searchRequest, isChecked, movies) => {
    setSearchResult(searchRequest);
    setFilteredMovies(
      movies.filter((movie) => {
        const searchResult = movie.nameRU
          .toLowerCase()
          .includes(searchRequest.toLowerCase());
        return isChecked ? searchResult && movie.duration <= 40 : searchResult;
      })
    );
  }, []);

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

      {isLoading ? (
        <Preloader />
      ) : (
        !isEmpty && (
          <section className="movies__section">
            <ul className="movies__list">
              {filteredMovies.slice(0, publishedMovies).map((cardData) => (
                <MoviesCard
                  cardData={cardData}
                  key={cardData.id}
                  addMovie={addMovie}
                />
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
        )
      )}
    </main>
  );
}

export default MoviesCardList;
