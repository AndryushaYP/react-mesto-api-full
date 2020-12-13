export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getAllCardsList() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addCard({link, name}) {
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ link: link, name: name }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserData() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me', {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  changeUserData({name, about}) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({name: name, about: about}),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  changeUserAvatar({avatar}) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me/avatar', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({avatar: avatar}),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-15/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  changeLikeCard(id, isLiked) {
    if(isLiked) {
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-15/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
    } else {
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-15/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
  

  /*addLikeCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-15/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteLikeCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-15/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }*/
}

const api = new Api({
  // Экземпляр класса АПИ
  url: "https://mesto.nomoreparties.co/v1/cohort-15/cards",
  headers: {
    authorization: "a0bff86e-f64d-4da1-b51a-ea82a126a932",
    "Content-Type": "application/json",
  },
});

export default api;
