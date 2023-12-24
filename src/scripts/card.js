export function createCard(link, name, deleteCard, openModal) {
  const cardsTemplate = document.querySelector("#card-template").content;
  const newCardElement = cardsTemplate.querySelector(".card").cloneNode(true);
  const newCardElementImage = newCardElement.querySelector(".card__image");

  newCardElementImage.src = link;
  newCardElementImage.alt = name;
  newCardElement.querySelector(".card__title").textContent = name;
  newCardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  newCardElementImage.addEventListener("click", () => {
    openModal(link, name);
  });

  return newCardElement;
}

export function deleteCard(event) {
  const element = event.target.closest(".card");
  element.remove();
}

export function handleLikeButtonClick(event) {
  if (event.target.classList.contains("card__like-button")) {
    event.target.classList.toggle("card__like-button_is-active");
  }
}