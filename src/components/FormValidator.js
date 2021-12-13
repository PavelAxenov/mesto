export default class FormValidator {
  constructor(configValidation, formElement) {
    this._formElement = formElement;
    this._inputSelector = configValidation.inputSelector;
    this._submitButtonSelector = configValidation.submitButtonSelector;
    this._inactiveButtonClass = configValidation.inactiveButtonClass;
    this._inputErrorClass = configValidation.inputErrorClass;
    this._errorClass = configValidation.errorClass;
  }

  // Функция показа ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Фукнция скрытия ошибки
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  // Функция для проверки наличия ошибок
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(buttonSubmit, inputList);

    this._formElement.addEventListener('reset', () => {
      this._disableButton( buttonSubmit);
      inputList.forEach((inputElement) => {
        this._hideInputError(inputElement)
      })
    });
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(buttonSubmit, inputList);
      })
    });
  }

  // Функция обхода массива полей
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton(buttonElement) {    
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  }

  // Функция блокировки кнопки отправить
  _toggleButtonState(buttonElement, inputList) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  enableValidation(configValidation) {
    this._formElement.addEventListener("submit", function (evt) {    //перехват события отправки формы
      evt.preventDefault();
    });
    this._setEventListeners(configValidation);
  }
}