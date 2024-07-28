/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import "./index.css";
import { initialCards, settings } from "../utils/constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileAddBtn = document.querySelector("#profile-add-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const imageModal = document.querySelector("#image-modal");
const profileEditCloseBtn = profileEditModal.querySelector(
  "#modal-close-button"
);
const profileAddCloseBtn = profileAddModal.querySelector("#modal-close-button");
const imageModalCloseBtn = imageModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-name");
const profileDescriptionInput = document.querySelector("#profile-description");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const profileAddElement = profileAddModal.querySelector(".modal__form");
const imageModalImage = imageModal.querySelector(".modal__image");
const imageModalTitle = imageModal.querySelector(".modal__image-title");
const cardListEl = document.querySelector(".cards__list");
const cardTitleInput = profileAddElement.querySelector("#card-name");
const cardUrlInput = profileAddElement.querySelector("#card-url");

const renderCard = (cardData) => {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
};

/* -------------------------------------------------------------------------- */
/*                               Class Instances                              */
/* -------------------------------------------------------------------------- */
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleProfileAddSubmit
);
addCardPopup.setEventListeners();

const cardPreviewPopup = new PopupWithImage("#image-modal");
cardPreviewPopup.setEventListeners();

const cardSection = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);
cardSection.renderItems(initialCards);

const user = new UserInfo(".profile__title", ".profile__description");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit(profileData) {
  e.preventDefault();
  const name = profileData.title;
  const description = profileData.subheader;
  user.setUserInfo(name, description);
  editProfilePopup.close();
}

function handleProfileAddSubmit(newCardData, cardListEl) {
  e.preventDefault();
  const name = newCardData.title;
  const alt = newCardData.title;
  const link = newCardData.url;
  renderCard({ name, alt, link });
  addCardPopup.close();
  e.target.reset();
}

function handleImageClick(name, link) {
  cardPreviewPopup.open(name, link);
}

function createCard(cardData) {
  return new Card(cardData, "#card-template", handleImageClick).getView();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
//Edit Profile Form
profileEditBtn.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  editProfilePopup.setInputValues({
    title: userInput.name,
    description: userInput.description,
  });
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

//New Card Form
profileAddBtn.addEventListener("click", () => {
  newCardPopup.open();
  addFormValidator._toggleButtonState();
});

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */
const editFormValidator = new FormValidator(settings, profileFormElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, profileAddElement);
addFormValidator.enableValidation();
