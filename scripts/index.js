// Для edit
const popupElement = document.querySelector('.popup_type_edit');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__eddit-button');

const nameProf = document.querySelector('.profile__name');
const jobProf = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profession');
const formElement = document.querySelector('.popup__form');

// Для add-card
const popupAddElement = document.querySelector('.popup_type_add-card');
const popupCloseButtonAddElement = popupAddElement.querySelector('.popup__close-button');
const popupOpenButtonAddElement = document.querySelector('.profile__add-button');

// Для popup-image
const popupImage = document.querySelector('.popup-image');
const popupCloseButtonImage = popupImage.querySelector('.popup__close-button');
const popupOpenButtonImage = document.querySelector('.places__image');
const popupImagePic = popupImage.querySelector('.popup-image__img');
const popupImageText = popupImage.querySelector('.popup-image__text');

//Для загрузки карточек на страницу
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

//Открытие попапов
const openPopup = function (element) {
  element.classList.add('popup_is-opened');
};

// Слушатели открытия попапов
popupOpenButtonElement.addEventListener('click', function() {   //Для edit
  openPopup(popupElement);
  nameInput.value = nameProf.textContent;
  jobInput.value = jobProf.textContent;
});

popupOpenButtonAddElement.addEventListener('click', function() {   //Для add
  openPopup(popupAddElement);
});

const openImagePopup = function(link, name) {     // Открывает Попап popup-image
  openPopup(popupImage);
  popupImagePic.src = link;
  popupImageText.textContent = name;
};

// Закрытие попапов
const closePopup = function() {
  popupElement.classList.remove('popup_is-opened');
  popupAddElement.classList.remove('popup_is-opened');
  popupImage.classList.remove('popup_is-opened');
};

const closePopupByClickOverlay = function(event) {  //Закрытие попапа при клике по пустому месту
  console.log(event.target, event.currentTarget);
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};

// Слушатели закрытия попапов
popupCloseButtonElement.addEventListener('click', function() {   //Для edit
  closePopup(popupElement);
});

popupCloseButtonAddElement.addEventListener('click', function() {   //Для add
  closePopup(popupAddElement);
});

formAddButton.addEventListener('click', function() {          //Для add кнопка сохранить
  closePopup(popupAddElement);
});

popupCloseButtonImage.addEventListener('click', function() {   //Для попапа с картинкой
  closePopup(popupImage);
});

popupElement.addEventListener('click', closePopupByClickOverlay);     //Для edit по пустому месту
popupAddElement.addEventListener('click', closePopupByClickOverlay);   //Для add по пустому месту
popupImage.addEventListener('click', closePopupByClickOverlay);       //Для картинки по пустому месту

// Изменение содержимого в профиле
function changeFormSubmitHandler(evt) {
  evt.preventDefault();
  nameProf.textContent = nameInput.value;
  jobProf.textContent = jobInput.value;    
  closePopup();
};

formElement.addEventListener('submit', changeFormSubmitHandler); // слушатель изменения содержимого в профиле

function render() {         //добавление новой карточки с данными на страницу
  initialCards.forEach((element) => {
    renderItem(element);
  })
  formAddButton.addEventListener('click', handleSubmit)
};

function addLikeButton(evt) {       //Добавление лайка
  evt.target.classList.toggle('places__like_active')
};

function renderItem(element) {
  //1.создать разметку
  const htmlElement = itemTemplate.content.cloneNode(true);

  //2. заменить в разметке текст
  htmlElement.querySelector('.places__text').textContent = element.name;
  htmlElement.querySelector('.places__image').src = element.link;
  htmlElement.querySelector('.places__image').alt = element.name;
  htmlElement.querySelector('.places__like').addEventListener('click', addLikeButton);  //Слушатель добавления лайка
  htmlElement.querySelector('.places__image').addEventListener('click', function() {   //для открытия попапа с картинкой
    openImagePopup(element.link, element.name)
  });

  //2.5 Навесить события
  setListeners(htmlElement);

  //3. вставить разметку в dom
  list.prepend(htmlElement);
};

function setListeners(element) {
  element.querySelector('.places__remove-button').addEventListener('click', handleDelete);// элемент на который навешано событие "удаление карточки"
  popupImagePic.addEventListener('click', function(link, name) {
    popupImage.classList.add('popup_is-opened');
    popupImagePic.src = link;
    popupImageText.textContent = name;
  });
};

function handleDelete(event) {       // Реакция на события в setListeners
  event.target.closest('.places__card').remove();
};

function handleSubmit(evt) {    //считывание записей из попапа "add-card"
  evt.preventDefault();
  let addObjectCard = {
    name: formAddInputName.value,
    link: formAddInputSource.value
  };
  renderItem(addObjectCard);
  closeAddPopup();
};

render();