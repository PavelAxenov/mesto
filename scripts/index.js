// Для edit
const popupElement = document.querySelector(".popup_type_edit");
const popupCloseButtonElement = popupElement.querySelector(".popup__close-button");
const popupOpenButtonElement = document.querySelector(".profile__eddit-button");

//Содержимое профиля
const profile = document.querySelector(".profile");
const userName = profile.querySelector(".profile__name");
const userJob = profile.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_profession");
const formElement = document.querySelector(".popup__form");

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

//Для загрузки карточек на страницу
const list = document.querySelector(".places__cards");
const itemTemplate = document.querySelector(".card-template");
const formAddButton = popupAddElement.querySelector(".popup__submit-button");
const formAddInputName = popupAddElement.querySelector(".popup__input_type_card-name");
const formAddInputSource = popupAddElement.querySelector(".popup__input_type_card-source");

//Открытие попапов
const openPopup = function (element) {
  element.classList.add("popup_is-opened");
};

// Слушатели открытия попапов
popupOpenButtonElement.addEventListener("click", function () {  //Для edit
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(popupElement);
});

popupOpenButtonAddElement.addEventListener("click", function () {  //Для add
  openPopup(popupAddElement);
});

const openImagePopup = function (link, name) {  // Открывает Попап popup-image
  openPopup(popupImage);
  popupImagePic.src = link;
  popupImageText.textContent = name;
};

// Закрытие попапов
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
};

const closePopupByClickOverlay = function (event) {  //Закрытие попапа при клике по пустому месту
  if (event.target !== event.currentTarget) {
    return;
  };
  closePopup(popupElement);
  closePopup(popupAddElement);
  closePopup(popupImage);
};

// Слушатели закрытия попапов
popupCloseButtonElement.addEventListener("click", function () {      //Для edit
  closePopup(popupElement);
});

popupCloseButtonAddElement.addEventListener("click", function () {   //Для add
  closePopup(popupAddElement);
});

formAddButton.addEventListener("click", function () {                //Для add кнопка сохранить
  closePopup(popupAddElement);
});

popupCloseButtonImage.addEventListener("click", function () {        //Для попапа с картинкой
  closePopup(popupImage);
});

popupElement.addEventListener("click", closePopupByClickOverlay);    //Для edit по пустому месту
popupAddElement.addEventListener("click", closePopupByClickOverlay); //Для add по пустому месту
popupImage.addEventListener("click", closePopupByClickOverlay);      //Для картинки по пустому месту

// Изменение содержимого в профиле
function changeFormSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupElement);
};

formElement.addEventListener("submit", changeFormSubmitHandler); //слушатель изменения содержимого в профиле

function render() {             //добавление новой карточки с данными на страницу
  initialCards.forEach((data) => {
    renderItem(data);
  });
  formAddButton.addEventListener("click", handleSubmit);
};

function addLikeButton(evt) {            //Добавление лайка
  evt.target.classList.toggle("places__like_active");
};

function getCardElement(data) {  //создание карточки
  //создать разметку
  const htmlElement = itemTemplate.content.cloneNode(true);

  //заменить в разметке текст
  htmlElement.querySelector(".places__text").textContent = data.name;
  htmlElement.querySelector(".places__image").src = data.link;
  htmlElement.querySelector(".places__image").alt = data.name;
  htmlElement.querySelector(".places__like").addEventListener("click", addLikeButton); //Слушатель добавления лайка
  htmlElement.querySelector(".places__image")
    .addEventListener("click", function () {
      //для открытия попапа с картинкой
      openImagePopup(data.link, data.name);
    });

  //Навесить события
  setListeners(htmlElement);

  //Вернуть карточку
  return htmlElement;
};

function renderItem(htmlElement) {
  //добавление карточки из getCardElement в список на странице
  let cardAdd = getCardElement(htmlElement);
  list.prepend(cardAdd);
};

function setListeners(data) {
  data.querySelector(".places__remove-button").addEventListener("click", handleDelete); // элемент на который навешано событие "удаление карточки"
  popupImagePic.addEventListener("click", function (link, name) {
    popupImagePic.src = link;
    popupImageText.textContent = name;
    popupImage.classList.add("popup_is-opened");
  });
};

function handleDelete(event) {
  // Реакция на события в setListeners
  event.target.closest(".places__card").remove();
};

function handleSubmit(evt) {  //считывание записей из попапа "add-card"
  evt.preventDefault();
  let addObjectCard = {
    name: formAddInputName.value,
    link: formAddInputSource.value,
  };
  renderItem(addObjectCard);
  closePopup(popupAddElement);
};

render();
