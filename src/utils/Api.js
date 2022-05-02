import apiConfig from './variables';

class Api {
  constructor(url, token, baseUrl) {
    this._url = url;
    this._token = token;
    this._baseUrl = baseUrl;
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`WASTED - ${response.status}`);
    }
  }

  getAllInfo() {
    return Promise.all([this.getUserInfo(), this.getArray()]);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(response => this._handleResponse(response));
  }

  getArray() {
    return fetch(`${this._url}/cards`, {
      headers: { authorization: this._token },
    }).then(response => this._handleResponse(response));
  }

  setInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: { authorization: this._token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, about: about }),
    }).then(response => this._handleResponse(response));
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: { authorization: this._token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, link: link }),
    }).then(response => this._handleResponse(response));
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: { authorization: this._token },
    }).then(response => this._handleResponse(response));
  }

  putLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: { authorization: this._token },
    }).then(response => this._handleResponse(response));
  }

  removeLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: { authorization: this._token },
    }).then(response => this._handleResponse(response));
  }

  setAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: { authorization: this._token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ avatar: avatar }),
    }).then(response => this._handleResponse(response));
  }

  // !!! NEW

  signup(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password, email: email }),
    }).then(res => this._handleResponse(res));
  }

  signin(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password, email: email }),
    }).then(res => this._handleResponse(res));
  }

  checkValidity() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(res => this._handleResponse(res));
  }
}

const api = new Api(apiConfig.url, apiConfig.token, apiConfig.baseUrl);
export default api;
