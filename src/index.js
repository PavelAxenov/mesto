import '../src/pages/index.css';
import Card from "../src/scripts/Card.js";
import Section from '../src/scripts/Section.js';
import FormValidator from "../src/scripts/FormValidator.js";
import PopupWithImage from '../src/scripts/PopupWithImage.js';
import PopupWithForm from '../src/scripts/PopupWithForm.js';
import UserInfo from '../src/scripts/UserInfo.js';
import { initialCards, configValidation } from "../src/scripts/constants.js";

import {
  popupOpenButtonElement,
  profileForm,
  nameInput,
  jobInput,
  popupOpenButtonAddElement,
  list
} from "./scripts/utils.js";

function generateCard(data) {
  const card = new Card(data, 'card-template', () => popupImage.open(data.link, data.name));
  const cardElement = card.renderCard();
  return cardElement
}

const formInfo = new UserInfo('.profile__name', '.profile__description');

const formPopup = new PopupWithForm('.popup_type_edit', (data) => {
    formInfo.setUserInfo(data);    
    formPopup.close();
  }
);

formPopup.setEventListeners();

const addImagePopup = new PopupWithForm('.popup_type_add-card', (data) => { 
    const cardElement = generateCard(data);
    initialCardList.addItem(cardElement);
    addImagePopup.close();
  }
);

addImagePopup.setEventListeners();

const popupImage  = new PopupWithImage('.popup-image');

popupImage.setEventListeners();

const initialCardList = new Section({
  data: initialCards,
  renderer: (item) => {const cardElement = generateCard(item);
    initialCardList.addItem(cardElement);
  }
}, list);

initialCardList.renderItems();

profileForm.forEach((formElement) => {
  const form = new FormValidator(configValidation, formElement);
  form.enableValidation();
});

popupOpenButtonElement.addEventListener('click', () => {
  const inputData = formInfo.getUserInfo();
  nameInput.value = inputData.name;
  jobInput.value = inputData.profession;
  formPopup.open();
});

popupOpenButtonAddElement.addEventListener('click', () => {  
  addImagePopup.open();
});