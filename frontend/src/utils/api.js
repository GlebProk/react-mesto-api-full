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

  _getHeaders() {
    const jwt = localStorage.getItem("jwt");
    return {
      "Authorization": `Bearer ${jwt}`,
      ...this._headers
    }
  }

  // Метод получения информации о профиле пользователя
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._getHeaders(),
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  // Метод получения карточек при открытии страницы
  getInitialCard() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._getHeaders(),
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  // Метод обновления информации о профиле пользователя
  patchUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._getHeaders(),
      body: JSON.stringify({ name, about })
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  // Метод добавления созданной пользователем карточки
  postNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._getHeaders(),
      body: JSON.stringify({ name, link })
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  // Метод удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._getHeaders(),
    })
      .then(res => {
        return this._getResponseData(res);
      })
  };


  // Метод постановки лайка на карточке
  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._getHeaders(),
    })
      .then(res => {
        return this._getResponseData(res);
      })
  };

  // Метод удаления лайка на карточке
  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._getHeaders(),
    })
      .then(res => {
        return this._getResponseData(res);
      })
  };

  // Метод для редактирования аватарки пользователя
  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar })
    })
      .then(res => {
        return this._getResponseData(res);
      })
  };
};

// Создаем экземпляр класса Api
const api = new Api({
  baseUrl: 'https://api.mesto.prokofyev.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
