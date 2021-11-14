// Для edit
const profilePopup = document.querySelector(".popup_type_edit");
const popupCloseButtonElement = profilePopup.querySelector(".popup__close-button");
const popupOpenButtonElement = document.querySelector(".profile__eddit-button");
const profileForm = profilePopup.querySelector(".popup__form");

//Содержимое профиля
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

//Для загрузки карточек на страницу
const list = document.querySelector(".places__cards");
const itemTemplate = document.querySelector(".card-template");
const formAddButton = popupAddElement.querySelector(".popup__submit-button");
const formAddInputName = popupAddElement.querySelector(".popup__input_type_card-name");
const formAddInputSource = popupAddElement.querySelector(".popup__input_type_card-source");
//console.log(formAddButton);
//Открытие попапов
const openPopup = function (element) {
  element.classList.add("popup_is-opened");
  document.addEventListener('keydown', closePopupByEsc);
  cleanForm();
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

// Закрытие попапов
function closePopup(popup) {
  const form = popup.querySelector('.popup__form');
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closePopupByEsc);
  if (form !== null) {
    form.reset();
    toggleButton(form);
  };  
};

const allPopups = document.querySelectorAll(".popup");    //Закрытие попапа при клике по пустому месту
allPopups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    };
  });
});

function closePopupByEsc(evt) {     //Закрытие попапов нажатием на ESC
  
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    const form = openedPopup.querySelector('.popup__form');
    closePopup(openedPopup);
    cleanForm();
    toggleButton(form);
    //closePopup(popupAddElement);
    //closePopup(popupImage);
  };
};

// Слушатели закрытия попапов
popupCloseButtonElement.addEventListener("click", function () {      //Для edit
  closePopup(profilePopup);
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

// Изменение содержимого в профиле
function changeFormSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(profilePopup);
};

profileForm.addEventListener("submit", changeFormSubmitHandler); //слушатель изменения содержимого в профиле

function render() {             //добавление новой карточки с данными на страницу
  initialCards.forEach((data) => {
    renderCard(data);
  });
};


//const newCardForm = popupAddElement.querySelector('.popup__form');
//const newCardForm = document.forms.addForm;
//formAddButton.addEventListener("click", handleAddCard);




const newCardForm = document.querySelector('.popup__form_type_add-card');
newCardForm.addEventListner("submit", handleAddCard);

// newCardForm.addEventListener("submit", function helloWorld(evt) {
//   evt.preventDefault();
//   console.log('Hello world');
// });

//console.log('Hello world')






function toggleLikes(evt) {            //Добавление лайка
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
  htmlElement.querySelector(".places__like").addEventListener("click", toggleLikes); //Слушатель добавления лайка
  htmlImageElement.addEventListener("click", function () {
      //для открытия попапа с картинкой
      openImagePopup(data.link, data.name);
    });

  //Навесить события
  setListeners(htmlElement);

  //Вернуть карточку
  return htmlElement;
};

function renderCard(htmlElement) {
  //добавление карточки из getCardElement в список на странице
  const cardAdd = getCardElement(htmlElement);
  list.prepend(cardAdd);
};

function setListeners(data) {
  data.querySelector(".places__remove-button").addEventListener("click", handleDelete); // элемент на который навешано событие "удаление карточки"
  // popupImagePic.addEventListener("click", function (link, name) {
  //   popupImagePic.src = link;
  //   popupImageText.textContent = name;
  //   popupImage.classList.add("popup_is-opened");
  // });
};

function handleDelete(event) {
  // Реакция на события в setListeners
  event.target.closest(".places__card").remove();
};
const addObjectCard = {
  name: formAddInputName.value,
  link: formAddInputSource.value,
};
function handleAddCard(evt) {  //считывание записей из попапа "add-card"
  evt.preventDefault();
  const addObjectCard = {
    name: formAddInputName.value,
    link: formAddInputSource.value,
  };
  renderCard(addObjectCard);
  closePopup(popupAddElement);
};

function cleanForm() {    //очистка формы после создания/сохранения
  document.getElementById('addForm').reset();
};


render();
//http://fdsjfjo
