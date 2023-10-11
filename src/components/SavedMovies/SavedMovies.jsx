import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { savedMovies } from '../../utils/constants';

function SavedMovies() {
  return (
    <>
      <Header />
      <MoviesCardList movies={savedMovies} />
      <Footer />
    </>
  );
}
export default SavedMovies;
