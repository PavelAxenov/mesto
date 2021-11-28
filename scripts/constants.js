//Карточки для загрузки на страницу
export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

// Для edit
export const profilePopup = document.querySelector(".popup_type_edit");
export const popupOpenButtonElement = document.querySelector(".profile__eddit-button");
export const profileForm = profilePopup.querySelector(".popup__form");

// Содержимое профиля
export const profile = document.querySelector(".profile");
export const userName = profile.querySelector(".profile__name");
export const userJob = profile.querySelector(".profile__description");
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_profession");

// Для add-card
export const popupAddElement = document.querySelector(".popup_type_add-card");
export const popupOpenButtonAddElement = document.querySelector(".profile__add-button");

// Для popup-image
export const popupImage = document.querySelector(".popup-image");

// Для загрузки карточек на страницу
export const list = document.querySelector(".places__cards");
export const formAddInputName = popupAddElement.querySelector(".popup__input_type_card-name");
export const formAddInputSource = popupAddElement.querySelector(".popup__input_type_card-source");

// Для использования в ф-циях
export const allPopups = document.querySelectorAll(".popup");
export const newCardForm = document.querySelector(".popup__form_type_add-card");

// export const listItem = list.querySelector(".places__card");
// export const popupImagePic = popupImage.querySelector(".popup-image__img");
// export const popupImageText = popupImage.querySelector(".popup-image__text");
// export const popupOpenButtonImage = listItem.querySelector(".places__image");
// export const popupOpenButtonText = listItem.querySelector(".places__text");

//Селектора для валидации формы
export const configValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
};