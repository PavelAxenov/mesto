import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleProfileFormSubmit) {
    super(popupSelector);
    this._handleProfileFormSubmit = handleProfileFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__submit-button');
  }

  _getInputValues() { 
    const data = {};
    this._inputList.forEach(input => data[input.name] = input.value);
    return data;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._handleProfileFormSubmit(this._getInputValues());
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit.bind(this));
  }

  close() {
    super.close();
    this._form.reset();
  }
}