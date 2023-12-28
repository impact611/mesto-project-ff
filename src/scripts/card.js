export function createCard(link, name, deleteCard, openModal, handleLike) {
  const cardsTemplate = document.querySelector("#card-template").content;
  const newCardElement = cardsTemplate.querySelector(".card").cloneNode(true);
  const newCardElementImage = newCardElement.querySelector(".card__image");

  newCardElementImage.src = link;
  newCardElementImage.alt = name;
  newCardElement.querySelector(".card__title").textContent = name;
  newCardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => deleteCard(newCardElement));

  newCardElementImage.addEventListener("click", () => {
    openModal(link, name);
  });
  newCardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (event) => handleLike(event));

  return newCardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function handleLike(event) {
  if (event.target.classList.contains("card__like-button")) {
    event.target.classList.toggle("card__like-button_is-active");
  }
}
