const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-3",
  headers: {
    authorization: "832d81ad-a10e-4b41-b739-e0988be6fb81",
    "Content-Type": "application/json",
  },
};

function checkApiResponseStatus(result) {
  if (result.ok) {
    return result.json();
  }
  return Promise.reject(`Ошибка: ${result.status}`);
}

function fetchUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((result) => checkApiResponseStatus(result));
}

function editUserData(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((result) => checkApiResponseStatus(result));
}

function editUserAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then((result) => checkApiResponseStatus(result));
}

function fetchCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((result) => checkApiResponseStatus(result));
}

function fetchCardById(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((result) => checkApiResponseStatus(result));
}

function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((result) => checkApiResponseStatus(result));
}

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((result) => checkApiResponseStatus(result));
}

function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((result) => checkApiResponseStatus(result));
}

function dislikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((result) => checkApiResponseStatus(result));
}

export {
  fetchUserData,
  editUserData,
  fetchCards,
  addCard,
  deleteCard,
  likeCard,
  dislikeCard,
  editUserAvatar,
};
