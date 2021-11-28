//Валидация форм   для рабочего кода 1
// const obj = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit-button',
//   inactiveButtonClass: 'popup__submit-button_inactive',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__input-error'
// };



// Объект настроек с классами и элементами для валидации
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

// Функция показа ошибки
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(configValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValidation.errorClass);
}

// Фукнция скрытия ошибки
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(configValidation.inputErrorClass);
  errorElement.classList.remove(configValidation.errorClass);
  errorElement.textContent = '';
}

// Функция для скрытия и показа ошибок
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// Добавляем слушатели
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверить состояние кнопки в самом начале
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// Запускаем валидацию
function enableValidation(configValidation) {
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}
// Вызов функции
enableValidation(configValidation);

// Функция обхода массива полей
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция блокировки кнопки отправить
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(configValidation.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(configValidation.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}




























//вариант 2 не рабочий

// function showInputError(formElement, inputElement, errorMessage) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(obj.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(obj.errorClass);
  
// };

// function hideInputError(formElement, inputElement) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(obj.inputErrorClass);
//   errorElement.classList.remove(obj.errorClass);
//   errorElement.textContent = '';
// };

// function checkInputValidity(formElement, inputElement) {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };

// function setEventListeners(formElement) {
//   const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
//   const buttonElement = formElement.querySelector(obj.submitButtonSelector);
//   toggleButton(inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       // чтобы проверить состояние кнопки в самом начале
//       toggleButton(inputList, buttonElement);
//     });
//   });
// };

// function enableValidation(obj) {
//   const formList = Array.from(document.querySelectorAll(obj.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement);
//   });
// };

// enableValidation(obj);

// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// function toggleButton(inputList, buttonElement) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(obj.inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(obj.inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// }








//вариант 1 рабочий


// function enableValidation() {    //Вытащить все формы на странице
//   const forms = document.querySelectorAll(obj.formSelector);
//   forms.forEach(addListenersToForm);
// };

// enableValidation(obj);

// function addListenersToForm(form) {      //Навешивание слушателей на иинпуты
//   const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
//   inputs.forEach(addListenersToInput);
//   form.addEventListener('submit', handleFormSubmit);
//   form.addEventListener('input', handleFormInput);
//   toggleButton(form);
// };

// function handleFormSubmit(evt) {   //сброс стандартного поведения браузера
//   evt.preventDefault();
// };

// function handleFormInput(evt) {
//   const form = evt.currentTarget;
//   toggleButton(form);
// };

// function toggleButton(form) {   //деактивация кнопки "Сохранить/создать" если форма не валидна
//   const button = form.querySelector(obj.submitButtonSelector);
//   const isFormInvalid = !form.checkValidity();
//   button.disabled = isFormInvalid;
//   button.classList.toggle(obj.inactiveButtonClass, isFormInvalid);
// };

// function addListenersToInput(input) {
//   input.addEventListener('input', handleFieldValidation);
// };

// function handleFieldValidation(evt) {   //Проверка валидности формы
//   const elementEvtTarget = evt.target;
//   const errorContainer = document.querySelector(`#${elementEvtTarget.id}-error`);
//   elementEvtTarget.classList.toggle(obj.inputErrorClass, !elementEvtTarget.validity.valid);
//   errorContainer.textContent = elementEvtTarget.validationMessage;
// };








