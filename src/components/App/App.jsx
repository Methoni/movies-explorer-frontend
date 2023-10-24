import React from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';
import './App.css';
import Main from '../Main/Main.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Profile from '../Profile/Profile.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('jwt'));
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSearchError, setIsSearchError] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      mainApi
        .getAllNeededData(localStorage.jwt)
        .then(([moviesData, userData]) => {
          setSavedMovies(moviesData);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
          setIsSearchError(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (localStorage.jwt) {
      mainApi
        .checkToken(localStorage.jwt)
        .then((res) => {
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // Блок авторизации и регистрации

  function handleLogin(email, password) {
    setIsSending(true);
    mainApi
      .authorize(email, password)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        navigate('/movies');
        setIsSuccessful(true);
      })
      .catch((err) => {
        console.log(`Ошибка при авторизации: ${err}`);
        setIsError(true);
        setIsSuccessful(false);
      })
      .finally(() => setIsSending(false));
  }

  function signOut() {
    localStorage.clear();
    setLoggedIn(false);
    navigate('/');
  }

  function handleRegister(username, email, password) {
    setIsSending(true);
    mainApi
      .register(username, email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          handleLogin(email, password);
          setIsSuccessful(true);
        }
      })
      .catch((err) => {
        console.log(`Ошибка при регистрации: ${err}`);
        setIsError(true);
        setIsSuccessful(false);
      })
      .finally(() => setIsSending(false));
  }

  function handleUpdateUser(username, email) {
    setIsSending(true);
    mainApi
      .editUserInfo(username, email, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        setIsSuccessful(true);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setIsSuccessful(false);
      })
      .finally(() => setIsSending(false));
  }

  // Блок с фильмами

  function handleSaveMovie(cardData) {
    mainApi
      .addMovie(cardData, localStorage.jwt)
      .then((addedMovie) => {
        setSavedMovies([...savedMovies, addedMovie]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovie(cardId) {
    mainApi
      .deleteMovie(cardId, localStorage.jwt)
      .then(() => {
        setSavedMovies(
          savedMovies.filter((movie) => {
            return movie._id !== cardId;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCheckMovie(cardData) {
    // Проверяем, сохранена ли карточка
    const isChecked = savedMovies.some(
      (movie) => cardData.id === movie.movieId
    );
    // Находим карточку и присваиваем movieId
    const findSavedMovie = savedMovies.filter((movie) => {
      return movie.movieId === cardData.id;
    });
    if (!isChecked) {
      handleSaveMovie(cardData);
    } else {
      handleDeleteMovie(findSavedMovie[0]._id);
    }
  }

  return (
    // «Внедряем» данные из currentUser с помощью провайдера контекста
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                element={Movies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                checkMovie={handleCheckMovie}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                loggedIn={loggedIn}
                isLoading={isLoading}
                savedMovies={savedMovies}
                checkMovie={handleCheckMovie}
                deleteMovie={handleDeleteMovie}
                isSearchError={isSearchError}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                onProfileEdit={handleUpdateUser}
                onSignOut={signOut}
                loggedIn={loggedIn}
                isError={isError}
                setIsError={setIsError}
                isSuccessful={isSuccessful}
                setIsSuccessful={setIsSuccessful}
                isSending={isSending}
              />
            }
          />
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Login
                  onLogin={handleLogin}
                  isError={isError}
                  setIsError={setIsError}
                  isSending={isSending}
                  isSuccessful={isSuccessful}
                  setIsSuccessful={setIsSuccessful}
                />
              )
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Register
                  onRegister={handleRegister}
                  isError={isError}
                  setIsError={setIsError}
                  isSending={isSending}
                  isSuccessful={isSuccessful}
                  setIsSuccessful={setIsSuccessful}
                />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
