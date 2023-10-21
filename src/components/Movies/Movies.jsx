import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import '../Main/Main.css';
import { moviesApi } from '../../utils/MoviesApi';

function Movies({ checkMovie, savedMovies }) {
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isEmpty, setIsEmpty] = React.useState(true);
  const [isSearched, setIsSearched] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSearchError, setIsSearchError] = React.useState(false);

  // Переменные для хранения в localStorage
  const [searchRequest, setSearchRequest] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);
  const [currentMovies, setCurrentMovies] = React.useState([]);

  function handleCheckBoxClick() {
    if (isChecked === false) {
      setIsChecked(true);
      localStorage.setItem('checkBoxState', JSON.stringify(true));
      filterMovies(searchRequest, true, currentMovies);
    } else {
      setIsChecked(false);
      localStorage.setItem('checkBoxState', JSON.stringify(false));
      filterMovies(searchRequest, false, currentMovies);
    }
  }

  const filterMovies = React.useCallback((searchText, isChecked, movies) => {
    setSearchRequest(searchText);
    setIsChecked(isChecked);
    setFilteredMovies(
      movies.filter((movie) => {
        const searchResultRu = movie.nameRU
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const searchResultEn = movie.nameEN
          .toLowerCase()
          .includes(searchText.toLowerCase());
        return isChecked
          ? (searchResultRu || searchResultEn) && movie.duration <= 40
          : searchResultRu || searchResultEn;
      })
    );
    localStorage.setItem('requestText', JSON.stringify(searchText));
    localStorage.setItem('checkBoxState', JSON.stringify(isChecked));
    localStorage.setItem('foundMovies', JSON.stringify(movies));
  }, []);

  function searchMovies(searchText) {
    if (currentMovies.length > 0) {
      filterMovies(searchText, isChecked, currentMovies);
    } else {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((res) => {
          setCurrentMovies(res);
          setIsChecked(false);
          setIsSearchError(false);
          filterMovies(searchText, isChecked, res);
        })
        .catch((err) => {
          console.log(err);
          setIsSearchError(true);
        })
        .finally(() => setIsLoading(false));
    }
    setIsSearched(true);
  }

  React.useEffect(() => {
    const requestText = localStorage.getItem('requestText');
    const checkBoxState = localStorage.getItem('checkBoxState');
    const foundMovies = localStorage.getItem('foundMovies');

    if (requestText && checkBoxState && foundMovies) {
      const searchText = JSON.parse(requestText);
      const isChecked = JSON.parse(checkBoxState);
      const movies = JSON.parse(foundMovies);

      setSearchRequest(searchText);
      setIsChecked(isChecked);
      setCurrentMovies(movies);
      filterMovies(searchText, isChecked, movies);
    }
    if (currentMovies.length > 0) {
      setIsEmpty(false);
    }
  }, [filterMovies, currentMovies.length]);

  return (
    <>
      <Header />
      <MoviesCardList
        checkMovie={checkMovie}
        isEmpty={isEmpty}
        isSearched={isSearched}
        isLoading={isLoading}
        isSearchError={isSearchError}
        savedMovies={savedMovies}
        filteredMovies={filteredMovies}
        isChecked={isChecked}
        handleCheckBoxClick={handleCheckBoxClick}
        searchMovies={searchMovies}
        searchRequest={searchRequest}
      />
      <Footer />
    </>
  );
}
export default Movies;
