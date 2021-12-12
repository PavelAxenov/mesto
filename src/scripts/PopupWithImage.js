import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup-image__img');

  }
  open(link, name){
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = link;
    this._popup.querySelector('.popup-image__text').textContent = name;
  }
}