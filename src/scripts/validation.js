function enableValidation(validationConfig) {
  const forms = document.querySelectorAll(validationConfig.formSelector);
  forms.forEach((form) => setEventListeners(form, validationConfig));
}

function clearValidation(form, validationConfig) {
  const inputs = form.querySelectorAll(validationConfig.inputSelector);
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );
  inputs.forEach((input) => hideError(input, validationConfig));
  changeButtonState(false, submitButton, validationConfig);
}

function validateInputValue(input, validationConfig) {
  if (input.validity.valueMissing) {
    showError(input, "Это обязательное поле", validationConfig);
    return false;
  }

  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.error);
  } else {
    input.setCustomValidity("");
  }

  if (input.validity.valid) {
    hideError(input, validationConfig);
  } else {
    showError(input, input.validationMessage, validationConfig);
  }

  return true;
}

function setEventListeners(form, validationConfig) {
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );
  form.addEventListener("input", (evt) => {
    const input = evt.target;
    const isFormValid = form.checkValidity();
    validateInputValue(input, validationConfig);
    changeButtonState(isFormValid, submitButton, validationConfig);
  });
  form.addEventListener("reset", () => clearValidation(form, validationConfig));
}

function showError(input, errorMessage, validationConfig) {
  const errorMessageElement = input
    .closest(validationConfig.formSelector)
    .querySelector(`.popup__error_type_${input.name}`);
  input.classList.add(validationConfig.inputErrorClass);
  errorMessageElement.textContent = errorMessage;
}

function hideError(input, validationConfig) {
  const errorMessageElement = input
    .closest(validationConfig.formSelector)
    .querySelector(`.popup__error_type_${input.name}`);
  input.classList.remove(validationConfig.inputErrorClass);
  errorMessageElement.textContent = "";
}

function changeButtonState(isValid, button, validationConfig) {
  if (isValid) {
    button.removeAttribute("disabled");
    button.classList.remove(validationConfig.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
  }
}

export { enableValidation, clearValidation };
