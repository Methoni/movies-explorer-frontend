import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { savedMovies } from '../../utils/constants';
import '../Main/Main.css';

function SavedMovies() {
  return (
    <main className="main page__movies movies">
      <Header />
      <MoviesCardList movies={savedMovies} />
      <Footer />
    </main>
  );
}
export default SavedMovies;
