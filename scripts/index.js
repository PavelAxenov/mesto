const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__eddit-button');

let nameInput = document.querySelector('.popup__input_type_name');
let nameProf = document.querySelector('.profile__name');
let jobProf = document.querySelector('.profile__description');
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

function changeFormSubmitHandler(evt) {    // Изменение содержимого в профиле
    evt.preventDefault();
    nameProf.textContent = nameInput.value;
    jobProf.textContent = jobInput.value;    
    closePopup();
};

let formElement = document.querySelector('.popup__form');
formElement.addEventListener('submit', changeFormSubmitHandler);