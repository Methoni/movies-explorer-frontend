import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
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
  const { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [allMovies, setAllMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn) {
      mainApi
        .getAllNeededData(localStorage.jwt)
        .then(([moviesData, userData]) => {
          setSavedMovies(moviesData);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (localStorage.jwt) {
      mainApi
        .checkToken(localStorage.jwt)
        .then((res) => {
          setLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  React.useEffect(() => {
    if (pathname === '/movies' || '/saved-movies') {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((res) => {
          setAllMovies(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  // Сбрасывает сообщения формы при повторном открытии страницы с формой
  const setFormMessages = React.useCallback(() => {
    setIsSuccessful(false);
    setIsError(false);
  }, []);

  // Блок авторизации и регистрации

  function handleLogin(email, password) {
    mainApi
      .authorize(email, password)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(`Ошибка при авторизации: ${err}`);
        setIsError(true);
      });
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/');
  }

  function handleRegister(username, email, password) {
    mainApi
      .register(username, email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        console.log(`Ошибка при регистрации: ${err}`);
        setIsError(true);
      });
  }

  function handleUpdateUser(username, email) {
    mainApi
      .editUserInfo(username, email, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        setIsSuccessful(true);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }

  // Блок с фильмами

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
    // Проверяем, есть ли уже лайк на этой карточке
    const isChecked = savedMovies.some(
      (movie) => cardData.id === movie.movieId
    );
    const checkedMovie = savedMovies.filter((movie) => {
      return movie.movieId === cardData.id;
    });
    if (isChecked) {
      handleDeleteMovie(checkedMovie[0]._id);
    } else {
      mainApi
        .addMovie(cardData, localStorage.jwt)
        .then((res) => {
          setSavedMovies([res, ...savedMovies]);
        })
        .catch((err) => {
          console.log(err);
        });
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
                isLoading={isLoading}
                movies={allMovies}
                savedMovies={savedMovies}
                addMovie={handleCheckMovie}
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
                onDelete={handleDeleteMovie}
                movies={savedMovies}
                savedMovies={savedMovies}
                addMovie={handleCheckMovie}
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
                isSuccessful={isSuccessful}
                setFormMessages={setFormMessages}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onLogin={handleLogin}
                isError={isError}
                setFormMessages={setFormMessages}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleRegister}
                isError={isError}
                setFormMessages={setFormMessages}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
