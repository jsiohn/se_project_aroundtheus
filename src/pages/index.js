/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import "./index.css";
import { initialCards, settings, cardData } from "../utils/constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileAddBtn = document.querySelector("#profile-add-button");
const profileAvatarBtn = document.querySelector("#avatar-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileAvatarModal = document.querySelector("#avatar-modal");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const profileEditSubmitBtn = profileEditModal.querySelector(
  "#profile-edit-submit"
);
const profileAddElement = profileAddModal.querySelector(".modal__form");
const profileAddSubmitBtn = profileAddModal.querySelector("#card-add-submit");
const profileAvatarElement = profileAvatarModal.querySelector(".modal__form");
const profileAvatarSubmitBtn = profileAvatarModal.querySelector(
  "#avatar-edit-submit"
);

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
cardSection.renderItems(cardData);

const user = new UserInfo(".profile__title", ".profile__description");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "b7515436-5dfa-4f13-a09a-5183c1df5fb3",
    "Content-Type": "application/json",
  },
});

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit(profileData) {
  const title = profileData.title;
  const description = profileData.description;
  user.setUserInfo(title, description);
  editProfilePopup.close();
}

function handleProfileAddSubmit(newCardData, cardListEl) {
  const name = newCardData.title;
  const alt = newCardData.title;
  const link = newCardData.url;
  renderCard({ name, alt, link });
  addCardPopup.close();
}

function handleImageClick(name, link) {
  cardPreviewPopup.open(name, link);
}

function createCard(cardData) {
  return new Card({ cardData, handleImageClick }, "#card-template").getView();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
//Edit Profile Form
profileEditBtn.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  editProfilePopup.setInputValues({
    title: userInput.title,
    description: userInput.description,
  });
  editProfilePopup.open();
});

//New Card Form
profileAddBtn.addEventListener("click", () => {
  addCardPopup.open();
});

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */
const editFormValidator = new FormValidator(settings, profileFormElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, profileAddElement);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(settings, profileAvatarElement);
avatarFormValidator.enableValidation();
