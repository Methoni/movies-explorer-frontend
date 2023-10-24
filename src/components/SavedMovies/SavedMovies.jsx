import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import '../Main/Main.css';

function SavedMovies({
  checkMovie,
  deleteMovie,
  savedMovies,
  isLoading,
  isSearchError,
}) {
  const [filteredMovies, setFilteredMovies] = React.useState(savedMovies);
  const [isEmpty, setIsEmpty] = React.useState(true);
  const [isSearched, setIsSearched] = React.useState(false);

  const [searchRequest, setSearchRequest] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);

  function handleCheckBoxClick() {
    if (isChecked === false) {
      setIsChecked(true);
      filterMovies(searchRequest, true, savedMovies);
    } else {
      setIsChecked(false);
      filterMovies(searchRequest, false, savedMovies);
    }
  }

  const filterMovies = React.useCallback((searchText, isChecked, movies) => {
    setSearchRequest(searchText);
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
  }, []);

  function searchMovies(searchText) {
    filterMovies(searchText, isChecked, savedMovies);
    setIsSearched(true);
  }

  React.useEffect(() => {
    filterMovies(searchRequest, isChecked, savedMovies);
    if (savedMovies.length > 0) {
      setIsEmpty(false);
    }
  }, [filterMovies, searchRequest, isChecked, savedMovies]);

  return (
    <>
      <Header />
      <MoviesCardList
        checkMovie={checkMovie}
        deleteMovie={deleteMovie}
        isEmpty={isEmpty}
        isSearched={isSearched}
        isLoading={isLoading}
        isSearchError={isSearchError}
        savedMovies={savedMovies}
        filteredMovies={filteredMovies}
        isChecked={isChecked}
        handleCheckBoxClick={handleCheckBoxClick}
        searchMovies={searchMovies}
      />
      <Footer />
    </>
  );
}
export default SavedMovies;
