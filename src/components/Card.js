export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {      //получаем и клонируем шаблон карточки
    const cardElement = document.querySelector(".card-template").content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  _toggleLikes() {    //Добавление лайка
    this._likeButton.classList.toggle("places__like_active");
  }

  _handleDelete() {
    this._removeButton.closest(".places__card").remove();
    this._element = null;            //при удалении карточки очистить ссылку на DOM-элемент
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._toggleLikes());

    this._removeButton.addEventListener('click', () => this._handleDelete());

    this._cardImage.addEventListener('click', () => this._handleCardClick());
  }

  renderCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.places__like');
    this._cardImage = this._element.querySelector('.places__image');
    this._removeButton = this._element.querySelector('.places__remove-button');
    this._setEventListeners();
    
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._element.querySelector('.places__text').textContent = this._data.name;
 
    return this._element;
  }
}