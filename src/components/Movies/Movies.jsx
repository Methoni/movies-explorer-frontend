import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import '../Main/Main.css';

function Movies({ movies, addMovie, savedMovies, isLoading }) {
  return (
    <>
      <Header />
      <MoviesCardList
        movies={movies}
        addMovie={addMovie}
        savedMovies={savedMovies}
        isLoading={isLoading}
      />
      <Footer />
    </>
  );
}
export default Movies;
