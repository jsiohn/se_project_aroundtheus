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
import PopupWithConfirm from "../components/PopupWithConfirm";
import { data } from "autoprefixer";

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
const deleteConfirmationModal = document.querySelector(
  "#delete-confirmation-modal"
);
const deleteConfirmationBtn =
  deleteConfirmationModal.querySelector(".modal__button");

// const renderCard =

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

const editAvatarPopup = new PopupWithForm(
  "#avatar-modal",
  handleAvatarEditSubmit
);
editAvatarPopup.setEventListeners();

const deleteConfirmation = new PopupWithConfirm("#delete-confirmation-modal");
deleteConfirmation.setEventListeners();

const cardPreviewPopup = new PopupWithImage("#image-modal");
cardPreviewPopup.setEventListeners();

const user = new UserInfo({
  name: ".profile__title",
  job: ".profile__description",
  avatar: ".profile__picture",
});

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
  console.log("profileData:", profileData);
  const name = profileData.title;
  const job = profileData.description;
  console.log("name:", name, "job:", job); //debugging
  profileEditSubmitBtn.textContent = "Saving...";

  api
    .editProfile(profileData.title, profileData.description)
    .then(() => {
      user.setUserInfo({ name, job });
      editFormValidator.disableSubmitButton();
      editProfilePopup.close();
      profileFormElement.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileEditSubmitBtn.textContent = "Save";
    });
}

function handleProfileAddSubmit(newCardData) {
  profileAddSubmitBtn.textContent = "Saving...";
  console.log(newCardData); //debugging
  api
    .addNewCard(newCardData.title, newCardData.url)
    .then((newCardData) => {
      const cardElement = createCard(newCardData);
      addFormValidator.disableSubmitButton();
      addCardPopup.close();
      profileAddElement.reset();
      cardSection.addItem(cardElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileAddSubmitBtn.textContent = "Save";
    });
}

function handleAvatarEditSubmit(link) {
  const url = link.url;
  console.log(url); //debugging
  profileAvatarSubmitBtn.textContent = "Saving...";
  api
    .updateProfilePic(url)
    .then(() => {
      user.setUserAvatar(url);
      avatarFormValidator.disableSubmitButton();
      editAvatarPopup.close();
      profileAvatarElement.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileAvatarSubmitBtn.textContent = "Save";
    });
}

function handleLikes(cardData) {
  console.log(cardData); //debugging
  if (!cardData.like) {
    //if not liked
    console.log(cardData.like);
    api
      .addLike(cardData._id)
      .then(() => {
        cardData.updateLike(true);
      })
      .catch((err) => {
        console.error(err);
      });
  } else if (cardData.like) {
    //if liked
    console.log(cardData.like);
    api
      .deleteLike(cardData._id)
      .then(() => {
        cardData.updateLike(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function handleDeleteConfirmationOpen(cardData) {
  deleteConfirmation.handleFormSubmit(() => {
    handleCardDelete(cardData);
  });
  deleteConfirmation.open();
}

function handleCardDelete(cardData) {
  console.log(cardData);
  deleteConfirmationBtn.textContent = "Deleting...";
  api
    .deleteCard(cardData._id)
    .then(() => {
      cardData.removeCard(cardData._id);
      deleteConfirmation.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      deleteConfirmationBtn.textContent = "Yes";
    });
}

function handleImageClick(name, link) {
  cardPreviewPopup.open(name, link);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteConfirmationOpen,
    handleLikes
  );
  const cardElement = card.getView();
  return cardElement;
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
//Edit Profile Form
profileEditBtn.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  editProfilePopup.setInputValues({
    title: userInput.name,
    description: userInput.job,
  });
  editProfilePopup.open();
});

//New Card Form
profileAddBtn.addEventListener("click", () => {
  addCardPopup.open();
});

//Edit Avatar Form
profileAvatarBtn.addEventListener("click", () => {
  editAvatarPopup.open();
});

// profileAvatarSubmitBtn.addEventListener("submit", handleAvatarEditSubmit);

/* -------------------------------------------------------------------------- */
/*                               Initial Render                               */
/* -------------------------------------------------------------------------- */
let cardSection;

api
  .getUserAndCards()
  .then(([userInfo, cardData]) => {
    console.log([userInfo, cardData]); //debugging
    cardSection = new Section(
      {
        items: cardData,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          cardSection.addItem(cardElement);
        },
      },
      ".cards__list"
    );
    user.setUserInfo({ name: userInfo.name, job: userInfo.about });
    user.setUserAvatar(userInfo.avatar);

    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
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
