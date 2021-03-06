import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteImage from '../components/PopupDeleteImage.js';
import UserInfo from '../components/UserInfo.js';
import { popupEditButton, nameInput, jobInput, addButton, formList, cardListSelector, avatarButton, validationClasses} from '../utils/constants.js';
import './index.css';
import { Api } from '../components/Api.js';

let initialCardList = {};
let userData;

function generateCard(userData, data) {
  const card = new Card(
    userData,
    data,
    'card-template',          
    () => popupImage.open(data.link, data.name),
    (card, id) => popupConfirm.open(card, id),
    (cardId) => {
      if(!card.isLiked(data)) {
        api.likeCard(cardId)
          .then((cardData) => {
            data = cardData;
            card.likeCard(cardData);
          })
          .catch(err => console.log(err))
      }
      else {
        api.dislikeCard(cardId)
          .then((cardData) => {
            data = cardData;
            card.likeCard(cardData)
          })
          .catch(err => console.log(err))
      }
    }
  );
  const cardElement = card.createCard();
  return cardElement
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-33',  
  token:'69522f9a-338d-49d0-a4b9-0f060a2c041a'
});

const formInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');

const formPopup = new PopupWithForm(
  '.popup_type_edit',
  (data) => {
    formPopup.renderLoading(true);
    api.sendUserData(data)
      .then(data => {
        formInfo.setUserInfo(data);
        formPopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => formPopup.renderLoading(false))
  }
)

const addImagePopup = new PopupWithForm(
  '.popup_type_add-card',
  (data) => {
    addImagePopup.renderLoading(true);
    api.sendNewCard(data)
      .then(card => {
        const cardElement = generateCard(userData, card);
        initialCardList.addItem(cardElement);
        addImagePopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => addImagePopup.renderLoading(false))
  }
)

const avatarPopup = new PopupWithForm(
  '.popup_type_edit-avatar',
  (data) => {
    avatarPopup.renderLoading(true);
    api.updateAvatar(data.avatar)
      .then((data) => {
        formInfo.setAvatar(data.avatar);
        avatarPopup.close();  
      })
      .catch(err => console.log(err))
      .finally(() => avatarPopup.renderLoading(false))
  }
)

const popupImage  = new PopupWithImage('.popup-image');

const popupConfirm = new PopupDeleteImage(
  ".popup_type_confirm",
  (card, id) => {
    api.deleteCard(id)
    .then(() => {
      card.remove()
      popupConfirm.close()
    })
  }
)

Promise.all([
  api.getInitialCards(),
  api.getUserData()
])
  .then((data) => {    
    const cardData = data[0].reverse();
    userData = data[1];

    formInfo.setUserInfo(userData); 
    formInfo.setAvatar(userData.avatar);

    initialCardList = new Section({
      data: cardData,
      renderer: (item) => {
        const cardElement = generateCard(userData, item);
        initialCardList.addItem(cardElement);
      }
    }, cardListSelector);
    initialCardList.renderItems();
  })
  .catch(err => console.log(err))

popupImage.setEventListeners();
addImagePopup.setEventListeners()
formPopup.setEventListeners();
popupConfirm.setEventListeners();
avatarPopup.setEventListeners()

formList.forEach((formElement) => {
  const form = new FormValidator(validationClasses, formElement);
  form.enableValidation();
});

popupEditButton.addEventListener('click', () => {
  const inputData = formInfo.getUserInfo()
  nameInput.value = inputData.name;
  jobInput.value = inputData.profession;
  formPopup.open();
})

addButton.addEventListener('click', () => {  
  addImagePopup.open();
});

avatarButton.addEventListener('click', () => {  
  avatarPopup.open();
});
