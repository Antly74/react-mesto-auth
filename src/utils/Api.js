class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ужас-ужас, произошла ошибка: ${res.status}`);
  }

  getInitialCards() {
    const requestOptions = {
      method: 'GET',
      headers: this._headers
    };

    return fetch(`${this._baseUrl}/cards`, requestOptions)
      .then(this._handleResponse);
  }

  getUserInfo() {
    const requestOptions = {
      method: 'GET',
      headers: this._headers
    };

    return fetch(`${this._baseUrl}/users/me`, requestOptions)
      .then(this._handleResponse);
  }

  patchUserInfo({name, about}) {
    const requestOptions = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    };

    return fetch(`${this._baseUrl}/users/me`, requestOptions)
      .then(this._handleResponse);
  }

  patchAvatar(avatar) {
    const requestOptions = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar})
    };

    return fetch(`${this._baseUrl}/users/me/avatar`, requestOptions)
      .then(this._handleResponse);
  }

  postCard({name, link}) {
    const requestOptions = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, link})
    };

    return fetch(`${this._baseUrl}/cards`, requestOptions)
      .then(this._handleResponse);
  }

  deleteCard(cardId) {
    const requestOptions = {
      method: 'DELETE',
      headers: this._headers,
    };

    return fetch(`${this._baseUrl}/cards/${cardId}`, requestOptions)
      .then(this._handleResponse);
  }

  toggleLikes(cardId, isLiked) {
    const requestOptions = {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
    };

    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, requestOptions)
      .then(this._handleResponse);
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'ea06fae9-cbb3-4f2c-858d-1af4a992ff90',
    'Content-Type': 'application/json'
  }
});

export { api };
