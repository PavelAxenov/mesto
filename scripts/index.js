// Для edit
const popupElement = document.querySelector('.popup_type_edit');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__eddit-button');

let nameProf = document.querySelector('.profile__name');
let jobProf = document.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_profession');

const openPopup = function() {     // Открывает Попап
  popupElement.classList.add('popup_is-opened');
  nameInput.value = nameProf.textContent;
  jobInput.value = jobProf.textContent;
};

const closePopup = function() {    // Закрывает Попап
  popupElement.classList.remove('popup_is-opened');
};

const closePopupByClickOverlay = function(event) {
  console.log(event.target, event.currentTarget);
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOverlay);

// Изменение содержимого в профиле
function changeFormSubmitHandler(evt) {
  evt.preventDefault();
  nameProf.textContent = nameInput.value;
  jobProf.textContent = jobInput.value;    
  closePopup();
};

let formElement = document.querySelector('.popup__form');
formElement.addEventListener('submit', changeFormSubmitHandler);

// Для add-card
const popupAddElement = document.querySelector('.popup_type_add-card');
const popupCloseButtonAddElement = popupAddElement.querySelector('.popup__close-button');
const popupOpenButtonAddElement = document.querySelector('.profile__add-button');

const openAddPopup = function() {     // Открывает Попап Add
  popupAddElement.classList.add('popup_is-opened');
};

const closeAddPopup = function() {    // Закрывает Попап Add
  popupAddElement.classList.remove('popup_is-opened');
};

const closeAddPopupByClickOverlay = function(event) {
  console.log(event.target, event.currentTarget);
  if (event.target !== event.currentTarget) {
    return;
  }
  closeAddPopup();
};

popupOpenButtonAddElement.addEventListener('click', openAddPopup);
popupCloseButtonAddElement.addEventListener('click', closeAddPopup);
popupAddElement.addEventListener('click', closeAddPopupByClickOverlay);

//Загрузка карточек на страницу при открытии
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const list = document.querySelector('.places__cards');
const itemTemplate = document.querySelector('.card-template');
const formAddButton = popupAddElement.querySelector('.popup__submit-button');
const formAddInputName = popupAddElement.querySelector('.popup__input_type_card-name');
const formAddInputSource = popupAddElement.querySelector('.popup__input_type_card-source');

function render () {         //добавление новой карточки с данными на страницу
  initialCards.forEach((element) => {
    renderItem(element);
  })
  formAddButton.addEventListener('click', handleSubmit)
};

function renderItem(element) {
  //1.создать разметку
  const htmlElement = itemTemplate.content.cloneNode(true);
  //2. заменить в разметке текст
  htmlElement.querySelector('.places__text').textContent = element.name;
  htmlElement.querySelector('.places__image').src = element.link;
  htmlElement.querySelector('.places__image').alt = element.name;
  htmlElement.querySelector('.places__like').addEventListener('click', function(evt) {    //Добавление лайка
    evt.target.classList.toggle('places__like_active');  
  });
  htmlElement.querySelector('.places__image').addEventListener('click', function() {   //для открытия попапа с картинкой
    openImagePopup(element.link, element.name)
  });

  //2.5 Навесить события
  setListeners(htmlElement);

  //3. вставить разметку в dom
  list.prepend(htmlElement);
};

function setListeners(element) {     // элемент на который навешано событие "удаление карточки"
  element.querySelector('.places__remove-button').addEventListener('click', handleDelete);
}

function handleDelete(event) {       // Реакция на события в setListeners
  event.target.closest('.places__card').remove();
}

function handleSubmit(evt) {    //считывание записей из попапа "add-card"
  evt.preventDefault();
  let addObjectCard = {
    name: formAddInputName.value,
    link: formAddInputSource.value
  };
  renderItem(addObjectCard);
  closeAddPopup();
};

render()

// Для popup-image
const popupImage = document.querySelector('.popup-image');
const popupCloseButtonImage = popupImage.querySelector('.popup__close-button');
const popupOpenButtonImage = document.querySelector('.places__image');


const openImagePopup = function(link, name) {     // Открывает Попап popup-image
  popupImage.classList.add('popup_is-opened');
  document.querySelector('.popup-image__img').src = link;
  document.querySelector('.popup-image__text').textContent = name;
};

// Закрывает Попап popup-image
const closeImagePopup = function() {
  popupImage.classList.remove('popup_is-opened');
};

const closeImagePopupByClickOverlay = function(event) {
  console.log(event.target, event.currentTarget);
  if (event.target !== event.currentTarget) {
    return;
  }
  closeImagePopup();
};

popupCloseButtonImage.addEventListener('click', closeImagePopup);
popupImage.addEventListener('click', closeImagePopupByClickOverlay);