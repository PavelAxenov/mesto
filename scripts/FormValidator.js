// const configValidation = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__submit-button',
//     inactiveButtonClass: 'popup__submit-button_inactive',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__input-error'
// };
        // this._errorClass = configValidation.errorClass;
        // console.log(this._formElement);
        // console.log(this._formSelector);
        // console.log(this._inputSelector);
        // console.log(this._submitButtonSelector);
        // console.log(this._inactiveButtonClass);
        // console.log(this._inputErrorClass);
        // console.log(this._errorClass);

        // this._formSelector = configValidation.formSelector;

export class FormValidator {
    constructor(configValidation, formElement) {
        this._formElement = formElement;        
        this._inputSelector = configValidation.inputSelector;
        this._submitButtonSelector = configValidation.submitButtonSelector;
        this._inactiveButtonClass = configValidation.inactiveButtonClass;
        this._inputErrorClass = configValidation.inputErrorClass;       
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        //errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        //errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(buttonElement, inputList); // чтобы проверить состояние кнопки в самом начале

        inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            
            this._toggleButtonState(buttonElement, inputList);
          });
        });
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        })
    }
 
    _toggleButtonState(buttonElement, inputList) {
        if (this._hasInvalidInput(inputList)) {
          buttonElement.classList.add(this._inactiveButtonClass);
          buttonElement.disabled = true;
          //buttonElement.setAttribute("disabled", "disabled");
        } else {
          buttonElement.classList.remove(this._inactiveButtonClass);
          buttonElement.disabled = false;
          //buttonElement.removeAttribute("disabled");
        }
    }
    // _checkInputValidity(inputElement) {
    //     if (!inputElement.validity.valid) {
    //         this._showInputError(this._formElement, inputElement, inputElement.validationMessage);
    //     } else {
    //         this._hideInputError(this._formElement, inputElement);
    //     }
    // }

    enableValidation() {
        this._setEventListeners()
    }
}

// enableValidation() {
//     this._setEventListeners(this._formElement)
// }