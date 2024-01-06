import "./../pages/index.css";
import {
  fetchUserData,
  editUserData,
  fetchCards,
  addCard,
  editUserAvatar,
} from "./api.js";
import initialCards from "./cards.js";
import { createCard, removeCard, handleLike } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";

const placesListContainer = document.querySelector(".places__list");
const closeButtons = document.querySelectorAll(".popup__close");

const profileTitleOutput = document.querySelector(".profile__title");
const profileDescriptionOutput = document.querySelector(
  ".profile__description"
);
const profileAvatarOutput = document.querySelector(".profile__image");
const editProfileTitleInput = document.querySelector(".popup__input_type_name");
const editProfileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);
const addCardTitleInput = document.querySelector(
  ".popup__input_type_card-name"
);
const addCardForm = document.querySelector('form[name="new-place"]');
const addCardUrlInput = addCardForm.querySelector(".popup__input_type_url");
const openEditProfileModalButton = document.querySelector(
  ".profile__edit-button"
);
const editProfileModal = document.querySelector(".popup_type_edit");
const editProfileForm = document.querySelector('form[name="edit-profile"]');
const addCardModal = document.querySelector(".popup_type_new-card");

const openAddCardModalButton = document.querySelector(".profile__add-button");
const imageModal = document.querySelector(".popup_type_image");
const modalImage = imageModal.querySelector(".popup__image");
const captionImageModal = imageModal.querySelector(".popup__caption");

const openEditAvatarModalButton = document.querySelector(
  ".profile__image-container"
);
const editAvatarModal = document.querySelector(".popup_type_avatar");
const editAvatarForm = document.querySelector('form[name="edit-avatar"]');
const editAvatarUrlInput = editAvatarForm.querySelector(
  ".popup__input_type_url"
);
let userId;

openEditAvatarModalButton.addEventListener("click", () => {
  openModal(editAvatarModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closeModal(popup);
  });
});
openAddCardModalButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardForm.addEventListener("submit", submitAddCardForm);
openEditProfileModalButton.addEventListener("click", () => {
  clearValidation(editProfileForm, validationConfig);
  editProfileTitleInput.value = profileTitleOutput.textContent;
  editProfileDescriptionInput.value = profileDescriptionOutput.textContent;
  openModal(editProfileModal);
});
editAvatarForm.addEventListener("submit", submitEditAvatarForm);
editProfileForm.addEventListener("submit", submitEditProfileForm);
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function submitEditAvatarForm(evt) {
  evt.preventDefault();

  toggleSubmitButton(true, editAvatarForm.querySelector(".popup__button"));

  editUserAvatar(editAvatarUrlInput.value)
    .then((result) => {
      profileAvatarOutput.src = result.avatar;

      toggleSubmitButton(false, editAvatarForm.querySelector(".popup__button"));
      closeModal(editAvatarModal);
    })
    .catch((error) => console.error(error))
    .finally(() => {
      toggleSubmitButton(false, editAvatarForm.querySelector(".popup__button"));
    });
}

function submitEditProfileForm(evt) {
  evt.preventDefault();

  toggleSubmitButton(true, editProfileModal.querySelector(".popup__button"));

  editUserData(editProfileTitleInput.value, editProfileDescriptionInput.value)
    .then((res) => {
      profileTitleOutput.textContent = res.name;
      profileDescriptionOutput.textContent = res.about;

      toggleSubmitButton(
        false,
        editProfileModal.querySelector(".popup__button")
      );
      closeModal(editProfileModal);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      toggleSubmitButton(
        false,
        editProfileModal.querySelector(".popup__button")
      );
    });
}

function submitAddCardForm(evt) {
  evt.preventDefault();

  toggleSubmitButton(true, addCardModal.querySelector(".popup__button"));

  addCard(addCardTitleInput.value, addCardUrlInput.value)
    .then((result) => {
      console.log("result", result);
      const card = createCard(
        {
          name: result.name,
          link: result.link,
          id: result._id,
          ownerId: result.owner._id,
          likes: result.likes,
        },
        removeCard,
        openImageModal,
        handleLike,
        userId
      );
      placesListContainer.prepend(card);
      addCardForm.reset();
      clearValidation(addCardForm, validationConfig);
      closeModal(addCardModal);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      toggleSubmitButton(false, addCardModal.querySelector(".popup__button"));
    });
}

function openImageModal(imageSrc, imageName) {
  modalImage.src = imageSrc;
  modalImage.alt = imageName;
  captionImageModal.textContent = imageName;

  openModal(imageModal);
}

function toggleSubmitButton(isLoading, button) {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

function renderAllCards(cardsArray, userId) {
  cardsArray.forEach((card) => {
    placesListContainer.append(
      createCard(
        {
          name: card.name,
          link: card.link,
          id: card._id,
          ownerId: card.owner._id,
          likes: card.likes,
        },
        removeCard,
        openImageModal,
        handleLike,
        userId
      )
    );
  });
}

Promise.all([fetchUserData(), fetchCards()])
  .then((data) => {
    const [user, cards] = data;
    profileTitleOutput.textContent = user.name;
    profileDescriptionOutput.textContent = user.about;
    profileAvatarOutput.src = user.avatar;
    userId = user._id;
    renderAllCards(cards, user._id);
  })
  .catch((error) => {
    console.log(error);
  });

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

clearValidation(addCardForm, validationConfig);
clearValidation(editProfileForm, validationConfig);
clearValidation(editAvatarForm, validationConfig);
