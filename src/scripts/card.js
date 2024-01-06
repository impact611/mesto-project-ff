import { deleteCard, likeCard, dislikeCard } from "./api.js";

export function createCard(card, removeCard, openModal, handleLike, userId) {
  const cardsTemplate = document.querySelector("#card-template").content;
  const cardElement = cardsTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like-count");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.setAttribute("data-id", card.id);
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardLikeCount.textContent = card.likes.length;
  if (userId !== card.ownerId) {
    cardDeleteButton.remove();
  }

  if (card.likes && card.likes.some((like) => like._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardDeleteButton.addEventListener("click", () => removeCard(cardElement));

  cardImage.addEventListener("click", () => {
    openModal(card.link, card.name);
  });
  cardLikeButton.addEventListener("click", () => handleLike(cardElement));

  return cardElement;
}

export function removeCard(cardElement) {
  const cardId = cardElement.getAttribute("data-id");
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => console.log(error));
}

export function handleLike(cardElement) {
  const cardId = cardElement.getAttribute("data-id");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like-count");

  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    dislikeCard(cardId)
      .then((data) => {
        cardLikeCount.textContent = data.likes.length;
        cardLikeButton.classList.remove("card__like-button_is-active");
      })
      .catch((error) => console.error(error));
  } else {
    likeCard(cardId)
      .then((data) => {
        cardLikeCount.textContent = data.likes.length;
        cardLikeButton.classList.add("card__like-button_is-active");
      })
      .catch((error) => console.error(error));
  }
}
