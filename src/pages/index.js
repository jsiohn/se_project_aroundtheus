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

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileAddBtn = document.querySelector("#profile-add-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const profileAddElement = profileAddModal.querySelector(".modal__form");

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
  addFormValidator.toggleButtonState();
});

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */
const editFormValidator = new FormValidator(settings, profileFormElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, profileAddElement);
addFormValidator.enableValidation();
