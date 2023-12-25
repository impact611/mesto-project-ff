export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeOnClickEscape);
  popup.addEventListener("mousedown", closeOnClickOverlay);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnClickEscape);
  popup.removeEventListener("keydown", closeOnClickOverlay);
}

export function closeOnClickEscape(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export function closeOnClickOverlay(evt) {
  if (evt.target && evt.currentTarget) {
    closeModal(evt.target);
  }
}
