import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  initialCards,
  configValidation,
  profilePopup,
  popupOpenButtonElement,
  profileForm,
  userName,
  userJob,
  nameInput,
  jobInput,
  popupAddElement,
  popupOpenButtonAddElement,
  list,
  formAddInputName,
  formAddInputSource,
  allPopups,
  newCardForm,
} from "./constants.js";

//Открытие попапов
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}

// Слушатели открытия попапов
popupOpenButtonElement.addEventListener("click", function () {
  //Для edit
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(profilePopup);
});

popupOpenButtonAddElement.addEventListener("click", function () {
  //Для add
  openPopup(popupAddElement);
});

//Закрытие попапов
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByEsc(evt) {
  //Закрытие попапов нажатием на ESC
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

// function popupListeners(evt) {
//   if (evt.target.classList.contains("popup_is-opened")) {
//     //для всех попапов с эти классом
//     closePopup(popup);
//   }
//   if (evt.target.classList.contains("popup__close-button")) {
//     //при нажатии на крестик
//     closePopup(popup);
//   }
//   if (evt.target.classList.contains("popup")) {
//     // для всех попапов
//     closePopup(evt.target);
//   }
// }

// Слушатели закрытия попапов
allPopups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      //для всех попапов с эти классом
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      //при нажатии на крестик
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup")) {
      // для всех попапов
      closePopup(evt.target);
    }
  });
});



// Изменение содержимого в профиле
function changeFormSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

profileForm.addEventListener("submit", changeFormSubmitHandler); //слушатель изменения содержимого в профиле

function handleAddCard(evt) {
  //считывание записей из попапа "add-card"
  evt.preventDefault();
  const addObjectCard = {
    name: formAddInputName.value,
    link: formAddInputSource.value,
  };
  renderItem(addObjectCard);
  closePopup(popupAddElement);
  newCardForm.reset();
}

newCardForm.addEventListener("submit", handleAddCard);

function render() {
  //добавление новой карточки с данными на страницу
  initialCards.forEach((element) => {
    renderItem(element);
  });
}

const renderItem = (data) => {
  const cardAdd = new Card(data, ".card-template").renderCard();
  list.prepend(cardAdd);
}

render();

const forms = Array.from(
  document.querySelectorAll(configValidation.formSelector)
);
forms.forEach(function (form) {
  new FormValidator(configValidation, form).enableValidation();
});
