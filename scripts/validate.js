//Валидация форм
const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

function enableValidation() {    //Вытащить все формы на странице
  const forms = document.querySelectorAll(obj.formSelector);
  forms.forEach(addListenersToForm);
};

function addListenersToForm(form) {      //Навешивание слушателей на иинпуты
  const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
  inputs.forEach(addListenersToInput);
  form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('input', handleFormInput);
  toggleButton(form);
};

function handleFormSubmit(evt) {   //сброс стандартного поведения браузера
  evt.preventDefault();
};

function handleFormInput(evt) {
  const form = evt.currentTarget;
  toggleButton(form);
};

function toggleButton(form) {   //деактивация кнопки "Сохранить/создать" если форма не валидна
  const button = form.querySelector(obj.submitButtonSelector);
  const isFormInvalid = !form.checkValidity();
  button.disabled = isFormInvalid;
  button.classList.toggle(obj.inactiveButtonClass, isFormInvalid);
};

function addListenersToInput(input) {
  input.addEventListener('input', handleFieldValidation);
};

function handleFieldValidation(evt) {   //Проверка валидности формы
  const elementEvtTarget = evt.target;
  const errorContainer = document.querySelector(`#${elementEvtTarget.id}-error`);
  elementEvtTarget.classList.toggle(obj.inputErrorClass, !elementEvtTarget.validity.valid);
  errorContainer.textContent = elementEvtTarget.validationMessage;
};

enableValidation();