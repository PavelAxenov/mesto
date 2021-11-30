// Для edit
export const profilePopup = document.querySelector(".popup_type_edit");
export const popupElement = document.querySelector(".popup_type_edit");
export const popupCloseButtonElement = popupElement.querySelector(".popup__close-button");
export const popupOpenButtonElement = document.querySelector(".profile__eddit-button");
export const profileForm = profilePopup.querySelector(".popup__form");

// Содержимое профиля
export const profile = document.querySelector(".profile");
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_profession");
export const userName = profile.querySelector(".profile__name");
export const userJob = profile.querySelector(".profile__description");

// Для add-card
export const popupAddElement = document.querySelector(".popup_type_add-card");
export const popupOpenButtonAddElement = document.querySelector(".profile__add-button");
export const popupCloseButtonAddElement = popupAddElement.querySelector(".popup__close-button");
export const formAddButton = popupAddElement.querySelector(".popup__submit-button");

// Для popup-image
export const popupImage = document.querySelector(".popup-image");
export const popupCloseButtonImage = popupImage.querySelector(".popup__close-button");

// Для загрузки карточек на страницу
export const list = document.querySelector(".places__cards");
export const formAddInputName = popupAddElement.querySelector(".popup__input_type_card-name");
export const formAddInputSource = popupAddElement.querySelector(".popup__input_type_card-source");

// Для использования в ф-циях
export const allPopups = document.querySelectorAll(".popup");
export const newCardForm = document.querySelector(".popup__form_type_add-card");