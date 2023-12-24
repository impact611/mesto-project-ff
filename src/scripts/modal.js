export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeOnClickEscape);
  document.addEventListener("mousedown", closeOnClickOverlay);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnClickEscape);
  document.removeEventListener("keydown", closeOnClickOverlay);
}

export function closeOnClickEscape(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export function closeOnClickOverlay(evt) {
  const currentModal = document.querySelector('.popup_is-opened');
  if (currentModal && evt.target === currentModal) {
    closeModal(currentModal);
  }
}
