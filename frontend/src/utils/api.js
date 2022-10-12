class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json()
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res}`);
  }

  // Метод получения информации о профиле пользователя
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  // Метод получения карточек при открытии страницы
  getInitialCard() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  // Метод обновления информации о профиле пользователя
  patchUserInfo(item) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  // Метод добавления созданной пользователем карточки
  postNewCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      })
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  // Метод удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        return this._getResponseData(res);
      })
  };


  // Метод постановки лайка на карточке
  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => {
        return this._getResponseData(res);
      })
  };

  // Метод удаления лайка на карточке
  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        return this._getResponseData(res);
      })
  };

  // Метод для редактирования аватарки пользователя
  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => {
        return this._getResponseData(res);
      })
  };
};

// Создаем экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: '5da3e556-d369-4c0e-9a2c-e2a83040763e',
    'Content-Type': 'application/json'
  }
});

export default api;
