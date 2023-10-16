import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { movies } from '../../utils/constants';
import '../Main/Main.css';

function Movies() {
  return (
    <main className="main page__movies movies">
      <Header />
      <MoviesCardList movies={movies} />
      <Footer />
    </main>
  );
}
export default Movies;
