import "./../pages/index.css";
import initialCards from "./cards.js";
import { createCard, deleteCard, handleLikeButtonClick } from "./card.js";
import { openModal, closeModal } from "./modal.js";

const placesListContainer = document.querySelector(".places__list");
const closeButtons = document.querySelectorAll(".popup__close");
const profileTitleOutput = document.querySelector(".profile__title");
const profileDescriptionOutput = document.querySelector(
  ".profile__description"
);
const editProfileTitleInput = document.querySelector(".popup__input_type_name");
const editProfileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);
const openEditProfileModalButton = document.querySelector(
  ".profile__edit-button"
);
const editProfileModal = document.querySelector(".popup_type_edit");
const editProfileForm = document.querySelector('form[name="edit-profile"]');
const addCardModal = document.querySelector(".popup_type_new-card");
const addCardForm = document.querySelector('form[name="new-place"]');
const openAddCardModalButton = document.querySelector(".profile__add-button");

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closeModal(popup);
  });
});
openAddCardModalButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardModal.addEventListener("submit", submitAddCardForm);
document.addEventListener("click", handleLikeButtonClick);
openEditProfileModalButton.addEventListener("click", () => {
  editProfileTitleInput.value = profileTitleOutput.textContent;
  editProfileDescriptionInput.value = profileDescriptionOutput.textContent;
  openModal(editProfileModal);
});
editProfileForm.addEventListener("submit", submitEditProfileForm);

function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileTitleOutput.textContent = editProfileTitleInput.value;
  profileDescriptionOutput.textContent = editProfileDescriptionInput.value;

  closeModal(editProfileModal);
}

function submitAddCardForm(evt) {
  evt.preventDefault();

  const name = addCardForm.querySelector(".popup__input_type_card-name").value;
  const link = addCardForm.querySelector(".popup__input_type_url").value;

  const newCard = createCard(link, name, deleteCard, openImageModal);
  placesListContainer.prepend(newCard);

  addCardForm.reset();
  closeModal(addCardModal);
}

function renderAllCards(cardsArray) {
  cardsArray.forEach((element) => {
    placesListContainer.append(
      createCard(element.link, element.name, deleteCard, openImageModal)
    );
  });
}

function openImageModal(imageSrc, imageName) {
  const imageModal = document.querySelector(".popup_type_image");
  const modalImage = imageModal.querySelector(".popup__image");
  const modalCaption = imageModal.querySelector(".popup__caption");

  modalImage.src = imageSrc;
  modalImage.alt = imageName;
  modalCaption.textContent = imageName;

  openModal(imageModal);
}

renderAllCards(initialCards);
