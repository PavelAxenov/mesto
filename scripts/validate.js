//Валидация форм
enableValidation();

function enableValidation() {    //Вытащить все формы на странице
  const forms = [...document.querySelectorAll('.popup__form')];
  forms.forEach(addListenersToForm);
};

function addListenersToForm(form) {      //Навешивание слушателей на иинпуты
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
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
  const button = form.querySelector('.popup__submit-button');
  const isFormInvalid = !form.checkValidity();
  button.disabled = isFormInvalid;
  button.classList.toggle('popup__submit-button_inactive', isFormInvalid);
};

function addListenersToInput(input) {
  input.addEventListener('input', handleFieldValidation);
};

function handleFieldValidation(evt) {   //Проверка валидности формы
  const elementEvtTarget = evt.target;
  const errorContainer = document.querySelector(`#${elementEvtTarget.id}-error`);
  elementEvtTarget.classList.toggle('popup__input_type_error', !elementEvtTarget.validity.valid);
  errorContainer.textContent = elementEvtTarget.validationMessage;
};

const popupInputLabel = document.querySelector('.popup__input');
popupInputLabel.addEventListener('keydown', function(evt) {     //Сохранение попапов нажатием на Enter
  if (evt.key === 'Enter') {
    changeFormSubmitHandler(evt);
  };
});

function closePopupByEsc(evt) {     //Закрытие попапов нажатием на ESC
  if (evt.key === "Escape") {
    closePopup(popupElement);
    closePopup(popupAddElement);
    closePopup(popupImage);
  };
};