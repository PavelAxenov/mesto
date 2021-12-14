import '../pages/index.css';
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from "../utils/constants.js"

import {
  configValidation,
  popupOpenButtonElement,
  profileForm,
  nameInput,
  jobInput,
  popupOpenButtonAddElement,
  list
} from "../utils/constants.js";

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
}, '.places__cards');

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