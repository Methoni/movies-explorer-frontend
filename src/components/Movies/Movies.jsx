import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { movies } from '../../utils/constants';

function Movies() {
  return (
    <>
      <Header />
      <MoviesCardList movies={movies} />
      <Footer />
    </>
  );
}
export default Movies;
