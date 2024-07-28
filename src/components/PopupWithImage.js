import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector(".modal__image");
    this._previewName = this._popupElement.querySelector(".modal__image-title");
  }

  open({ name, link }) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._previewName.textContent = name;
    super.open();
  }
}
