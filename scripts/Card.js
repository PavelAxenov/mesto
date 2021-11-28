import {popupImage, openPopup} from './index.js';

export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement  = document.querySelector('.card-template').content.firstElementChild.cloneNode(true);
        return cardElement 
    }

    renderCard() {
        this._element = this._getTemplate();
        const htmlImageElement = this._element.querySelector(".places__image");
        this._element.querySelector(".places__text").textContent = this._name;
        htmlImageElement.src = this._link;
        htmlImageElement.alt = this._name;

        this._setListeners(this._element);
        this._setLikeListener(this._element);
        this._setImageHandler(this._element);

        return this._element
    }

    _setListeners(element) {
        element.querySelector('.places__remove-button').addEventListener("click", this._handleDelete);
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

    _setImageHandler(cardTemplate) {
        const popupImagePic = popupImage.querySelector(".popup-image__img");
        const popupImageText = popupImage.querySelector(".popup-image__text");
        //const itemTemplate = cardTemplate.querySelector(".places__card");
        const popupOpenButtonImage = cardTemplate.querySelector(".places__image");
        const popupOpenButtonText = cardTemplate.querySelector(".places__text");

        popupOpenButtonImage.addEventListener('click', function() {
            popupImagePic.src = popupOpenButtonImage.getAttribute('src');
            popupImageText.textContent = popupOpenButtonText.textContent;
            popupImagePic.alt = popupOpenButtonImage.getAttribute('alt');
            openPopup(popupImage)
        })
    }
}








// constructor(userData, cardData, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, handleDislikeClick) {
    //     this._templateSelector = templateSelector;
    //     this._cardData = cardData;
    //     this._name = cardData.name;
    //     this._link = cardData.link;
    //     this._likes = cardData.likes;
    //     this._handleCardClick = handleCardClick;
    //     //this._ownerId = cardData.owner._id;
    //     //this._cardId = cardData._id;
    //     this._handleDeleteClick = handleDeleteClick;
    //     this._handleLikeClick = handleLikeClick;
    //     //this._handleDislikeClick = handleDislikeClick;
    //     this._userId = userData._id;
    //   }

    // _getTemplate() {
    //     const cardElement = document
    //         .querySelector('.card-template')
    //         .content
    //         // .firstElementChild
    //         .querySelector('.places__card')
    //         .cloneNode(true);
    //     return cardElement;
    // }

    // _setEventListeners() {
    //     this._likeButton.addEventListener('click', () => {this._handleLikeClick(this._cardId)});
    
    //     this._removeButton.addEventListener('click', () => this._handleDeleteClick(this._element, this._cardId));
    
    //     this._cardImage.addEventListener('click', () => this._handleCardClick());
    // }

    // generateCard() {
    //     this._element = this._getTemplate();

    //     this._removeButton = this._element.querySelector('.places__remove-button');
    //     this._cardImage = this._element.querySelector('.places__image');
    //     this._likeButton = this._element.querySelector('.places__like-button');

    //     this._cardImage.src = this._link;
    //     this._cardImage.alt = this.name;
    //     this._element.querySelector('.places__text').textContent = this._name;

    //     if (this.isLiked(this._cardData)) {
    //         this._likeButton.classList.add('places__like_active');
    //     }

    //     return this._element
    // }

    // likeCard(card) {
    //     this._likeButton.classList.toggle('places__like_active');
    // }