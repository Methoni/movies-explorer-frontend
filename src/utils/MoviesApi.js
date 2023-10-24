class MoviesApi {
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

  // получение карточек фильмов с сервера
  getMovies() {
    return fetch(`${this._baseUrl}/`).then((res) => this._getResponseData(res));
  }
}

// создание экземпляра класса MoviesApi
export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});
