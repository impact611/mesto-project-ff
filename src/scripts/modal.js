export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeOnClickEscape);
  modal.addEventListener("mousedown", closeOnClickOverlay);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnClickEscape);
  modal.removeEventListener("keydown", closeOnClickOverlay);
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
