//       Всплывающее окно
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__eddit-button');

const openPopup = function() {
    popupElement.classList.add('popup_is-opened');
};

const closePopup = function() {
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

//        Изменение содержимого
let nameProf = document.querySelector('.profile__name');
let jobProf = document.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-profession');

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProf.textContent = nameInput.value;
    jobProf.textContent = jobInput.value;    
    closePopup();
};

let formElement = document.querySelector('.popup__form');
formElement.addEventListener('submit', formSubmitHandler);