import {popupImage} from "./constants.js";
import {openPopup} from "./index.js";

export default class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(".card-template")
        .content.firstElementChild
        .cloneNode(true);
        return cardElement;
    }

    renderCard() {
        this._element = this._getTemplate();
        const htmlImageElement = this._element.querySelector(".places__image");
        this._element.querySelector(".places__text").textContent = this._name;
        htmlImageElement.src = this._link;
        htmlImageElement.alt = this._name;

        this._setDeleteListener(this._element);  //this._element
        this._setLikeListener(this._element);
        this._setImageHandler(this._element);

        return this._element
    }

    _setDeleteListener(element) { //добавление обработчика для кнопки удаления
        element.querySelector(".places__remove-button").addEventListener("click", this._handleDelete);
    }

    _handleDelete(event) {
        event.target.closest(".places__card").remove();
    }

    _setLikeListener(element) {
        element.querySelector(".places__like").addEventListener("click", this._toggleLikes);
    }

    _toggleLikes(evt) {           //Добавление лайка
        evt.target.classList.toggle("places__like_active");
    };

    _getAttribute(cardTemplate) {
        const popupImagePic = popupImage.querySelector(".popup-image__img");
        const popupImageText = popupImage.querySelector(".popup-image__text");
        const popupOpenButtonImage = cardTemplate.querySelector(".places__image");
        const popupOpenButtonText = cardTemplate.querySelector(".places__text");

        popupImagePic.src = popupOpenButtonImage.getAttribute("src");
        popupImageText.textContent = popupOpenButtonText.textContent;
        popupImagePic.alt = popupOpenButtonImage.getAttribute("alt");
        openPopup(popupImage)
    }

    _setImageHandler = (cardTemplate) => {
        const popupOpenButtonImage = cardTemplate.querySelector(".places__image");
        popupOpenButtonImage.addEventListener("click", this._getAttribute);        
    }
}


// const popupImagePic = popupImage.querySelector(".popup-image__img");
        // const popupImageText = popupImage.querySelector(".popup-image__text");
        // const popupOpenButtonImage = cardTemplate.querySelector(".places__image");
        // const popupOpenButtonText = cardTemplate.querySelector(".places__text");

        
        
            // popupImagePic.src = popupOpenButtonImage.getAttribute("src");
            // popupImageText.textContent = popupOpenButtonText.textContent;
            // popupImagePic.alt = popupOpenButtonImage.getAttribute("alt");
            // openPopup(popupImage)