import { popupImage } from "./utils.js";
import { openPopup } from "./index.js";

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(".card-template")
      .content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  renderCard() {
    this._element = this._getTemplate();
    const htmlImageElement = this._element.querySelector(".places__image");
    this._element.querySelector(".places__text").textContent = this._name;
    htmlImageElement.src = this._link;
    htmlImageElement.alt = this._name;

    this._setDeleteListener();
    this._setLikeListener();
    this._setImageHandler();

    return this._element;
  }

  _setDeleteListener() {    //добавление обработчика для кнопки удаления
    this._element.querySelector(".places__remove-button").addEventListener("click", this._handleDelete);
  }

  _handleDelete(event) {
    event.target.closest(".places__card").remove();
    this._element = null;            //при удалении карточки очистить ссылку на DOM-элемент
  }

  _setLikeListener() {
    this._element
      .querySelector(".places__like")
      .addEventListener("click", this._toggleLikes);
  }

  _toggleLikes(evt) {    //Добавление лайка
    evt.target.classList.toggle("places__like_active");
  }

  _getAttr = () => {
    popupImage.querySelector(".popup-image__img").src = this._link;
    popupImage.querySelector(".popup-image__text").textContent = this._name;
    popupImage.querySelector(".popup-image__img").alt = this._name;

    openPopup(popupImage);
  };

  _setImageHandler() {
    this._element.querySelector(".places__image").addEventListener("click", this._getAttr);
  }
}
