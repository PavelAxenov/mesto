// Для edit
const profilePopup = document.querySelector(".popup_type_edit");
const popupCloseButtonElement = profilePopup.querySelector(".popup__close-button");
const popupOpenButtonElement = document.querySelector(".profile__eddit-button");
const profileForm = profilePopup.querySelector(".popup__form");

// Содержимое профиля
const profile = document.querySelector(".profile");
const userName = profile.querySelector(".profile__name");
const userJob = profile.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_profession");

// Для add-card
const popupAddElement = document.querySelector(".popup_type_add-card");
const popupCloseButtonAddElement = popupAddElement.querySelector(".popup__close-button");
const popupOpenButtonAddElement = document.querySelector(".profile__add-button");

// Для popup-image
const popupImage = document.querySelector(".popup-image");
const popupCloseButtonImage = popupImage.querySelector(".popup__close-button");
const popupOpenButtonImage = document.querySelector(".places__image");
const popupImagePic = popupImage.querySelector(".popup-image__img");
const popupImageText = popupImage.querySelector(".popup-image__text");

// Для загрузки карточек на страницу
const list = document.querySelector(".places__cards");
const itemTemplate = document.querySelector(".card-template");
const formAddButton = popupAddElement.querySelector(".popup__submit-button");
const formAddInputName = popupAddElement.querySelector(".popup__input_type_card-name");
const formAddInputSource = popupAddElement.querySelector(".popup__input_type_card-source");

// Для использования в ф-циях
const allPopups = document.querySelectorAll(".popup");
const newCardForm = document.querySelector(".popup__form_type_add-card");

//Открытие попапов
const openPopup = function (element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
};

// Слушатели открытия попапов
popupOpenButtonElement.addEventListener("click", function () {  //Для edit
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(profilePopup);
});

popupOpenButtonAddElement.addEventListener("click", function () {  //Для add
  openPopup(popupAddElement);
});

const openImagePopup = function (link, name) {  // Открывает Попап popup-image
  openPopup(popupImage);
  popupImagePic.src = link;
  popupImagePic.alt = name;
  popupImageText.textContent = name;
};

//Закрытие попапов
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
};

allPopups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(evt.target);
    };
  });
});

function closePopupByEsc(evt) {  //Закрытие попапов нажатием на ESC
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  };
};

// Слушатели закрытия попапов
popupCloseButtonElement.addEventListener("click", function () {  //Для edit
  closePopup(profilePopup);
});

popupCloseButtonAddElement.addEventListener("click", function () {  //Для add
  closePopup(popupAddElement);
});

formAddButton.addEventListener("click", function () {  //Для add кнопка сохранить
  closePopup(popupAddElement);
});

popupCloseButtonImage.addEventListener("click", function () {  //Для попапа с картинкой
  closePopup(popupImage);
});

// Изменение содержимого в профиле
function changeFormSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(profilePopup);
};

profileForm.addEventListener("submit", changeFormSubmitHandler); //слушатель изменения содержимого в профиле

function render() {  //добавление новой карточки с данными на страницу
  initialCards.forEach((data) => {
    renderCard(data);
  });
};

newCardForm.addEventListener("submit", handleAddCard);

function toggleLikes(evt) {           //Добавление лайка
  evt.target.classList.toggle("places__like_active");
};

function getCardElement(data) {  //создание карточки
  //создать разметку
  const htmlElement = itemTemplate.content.cloneNode(true);
  const htmlImageElement = htmlElement.querySelector(".places__image");

  //заменить в разметке текст
  htmlElement.querySelector(".places__text").textContent = data.name;
  htmlImageElement.src = data.link;
  htmlImageElement.alt = data.name;
  htmlElement                                //Слушатель добавления лайка
    .querySelector(".places__like")
    .addEventListener("click", toggleLikes);
  htmlImageElement.addEventListener("click", function () {    //для открытия попапа с картинкой
    openImagePopup(data.link, data.name);
  });

  //Навесить события
  setListeners(htmlElement);

  //Вернуть карточку
  return htmlElement;
};

function renderCard(htmlElement) {  //добавление карточки из getCardElement в список на странице
  const cardAdd = getCardElement(htmlElement);
  list.prepend(cardAdd);
};

function setListeners(data) {
  data                                      // элемент на который навешано событие "удаление карточки"
    .querySelector(".places__remove-button")
    .addEventListener("click", handleDelete);
};

function handleDelete(event) {  // Реакция на события в setListeners
  event.target.closest(".places__card").remove();
};

function handleAddCard(evt) {  //считывание записей из попапа "add-card"
  evt.preventDefault();
  const addObjectCard = {
    name: formAddInputName.value,
    link: formAddInputSource.value,
  };
  renderCard(addObjectCard);
  closePopup(popupAddElement);
  newCardForm.reset();
  toggleButton(newCardForm);
};

render();