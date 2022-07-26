class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = {
      'Content-Type': 'application/json'
    };
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ужас-ужас, произошла ошибка: ${res.status}`);
  }

  register({email, password}) {
    const requestOptions = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    };

    return fetch(`${this._baseUrl}/signup`, requestOptions)
      .then(this._handleResponse);
  }

  login({email, password}) {
    const requestOptions = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    };

    return fetch(`${this._baseUrl}/signin`, requestOptions)
      .then(this._handleResponse);
  }

  getUserInfo(token) {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        ...this._headers
      }
    };

    return fetch(`${this._baseUrl}/users/me`, requestOptions)
      .then(this._handleResponse);
  }

}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co'
});

export { auth };
