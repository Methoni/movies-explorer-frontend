class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  // проверка ответа сервера и преобразование из json
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  // регистрация пользователя
  register(username, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // авторизация пользователя
  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // проверка токена
  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  // получение карточек фильмов с сервера
  getUserMovies(token) {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  // добавление карточки фильма на сервер
  addMovie(cardData, token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: cardData.country,
        director: cardData.director,
        duration: cardData.duration,
        year: cardData.year,
        description: cardData.description,
        image: `https://api.nomoreparties.co${cardData.image.url}`,
        trailerLink: cardData.trailerLink,
        thumbnail: `https://api.nomoreparties.co${cardData.image.formats.thumbnail.url}`,
        movieId: cardData.id,
        nameRU: cardData.nameRU,
        nameEN: cardData.nameEN,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // удаление карточки с сервера
  deleteMovie(cardId, token) {
    return fetch(`${this._baseUrl}/movies/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._getResponseData(res));
  }

  // получение своих данных пользователя с сервера
  getMyUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  // внесение изменений в свои данные пользователя на сервере
  editUserInfo(username, email, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username,
        email: email,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // возвращает массив промисов, которые нужно исполнить
  getAllNeededData(token) {
    return Promise.all([this.getUserMovies(token), this.getMyUserInfo(token)]);
  }
}

// создание экземпляра класса Api
export const mainApi = new MainApi({
  baseUrl: 'https://api.movies.methoni.nomoredomainsrocks.ru',
});
