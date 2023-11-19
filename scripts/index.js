// @todo: Темплейт карточки
const cardsTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesListContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(link, name, callback) {
  const newCardElement = cardsTemplate.querySelector(".card").cloneNode(true);

  newCardElement.querySelector(".card__image").src = link;
  newCardElement.querySelector(".card__image").alt = name;
  newCardElement.querySelector(".card__title").textContent = name;
  newCardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", callback);

  placesListContainer.append(newCardElement);
}
// @todo: Функция удаления карточки
function deleteCard(event) {
  const element = event.target.closest(".card");
  element.remove();
}
// @todo: Вывести карточки на страницу
function renderAllCards(cardsArray) {
 cardsArray.forEach(element => {
  createCard(element.link, element.name, deleteCard)
 });
}

renderAllCards(window.initialCards);
