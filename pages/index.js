import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible",
};

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-template");
card.getView();

/* -------------------------------- Elements -------------------------------- */
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

/* -------------------------------- Functions ------------------------------- */
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
}

function closeModalClick(e) {
  if (e.target === e.currentTarget) {
    closeModal(e.currentTarget);
  }
}

function closeModalEsc(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  return cardElement.getView();
}

/* ----------------------------- Event Handlers ----------------------------- */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleProfileAddSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(profileAddModal);
  e.target.reset();
}

function handleImageClick(cardData) {
  imageModalImage.src = cardData.link;
  imageModalImage.alt = cardData.name;
  imageModalTitle.textContent = cardData.name;
  openModal(imageModal);
}

/* ----------------------------- Event Listeners ---------------------------- */
profileEditModal.addEventListener("click", closeModalClick);

profileAddModal.addEventListener("click", closeModalClick);

imageModal.addEventListener("click", closeModalClick);

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileAddBtn.addEventListener("click", () => openModal(profileAddModal));

profileEditCloseBtn.addEventListener("mousedown", () =>
  closeModal(profileEditModal)
);

profileAddCloseBtn.addEventListener("mousedown", () =>
  closeModal(profileAddModal)
);

imageModalCloseBtn.addEventListener("mousedown", () => closeModal(imageModal));

profileFormElement.addEventListener("submit", handleProfileEditSubmit);
profileAddElement.addEventListener("submit", handleProfileAddSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

const editFormValidator = new FormValidator(settings, profileFormElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, profileAddElement);
addFormValidator.enableValidation();
