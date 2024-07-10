import Card from "../components/Card.js";

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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
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

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardNameEl = cardElement.querySelector(".card__name");
  // const likeButton = cardElement.querySelector(".card__like-button");
  // const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardNameEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;
  cardImageEl.src = cardData.link;

  // likeButton.addEventListener("click", () => {
  //   likeButton.classList.toggle("card__like-button_active");
  // });

  // cardDeleteBtn.addEventListener("click", () => {
  //   cardElement.remove();
  // });

  cardImageEl.addEventListener("click", () => {
    imageModalImage.src = cardData.link;
    imageModalImage.alt = cardData.name;
    imageModalTitle.textContent = cardData.name;
    openModal(imageModal);
  });
  return cardElement;
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
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

profileEditCloseBtn.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileAddCloseBtn.addEventListener("click", () => closeModal(profileAddModal));

imageModalCloseBtn.addEventListener("click", () => closeModal(imageModal));

profileFormElement.addEventListener("submit", handleProfileEditSubmit);
profileAddElement.addEventListener("submit", handleProfileAddSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
