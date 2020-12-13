//Формы
export const editForm = document.querySelector(".popup__form_type_edit");
export const addForm = document.querySelector(".popup__form_type_add");
export const avatarForm = document.querySelector(".popup__form_type_avatar");
export const confirmForm = document.querySelector(".popup__form_type_confirm");
//Модалки
export const popupList = document.querySelectorAll(".popup");
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupAdd = document.querySelector(".popup_type_add");
export const popupImage = document.querySelector(".popup_type_open-image");
export const popupAvatar = document.querySelector(".popup_type_avatar");
export const popupConfirm = document.querySelector(".popup_type_confirm");
//Кнопки
export const buttonSubmitEdit = popupEdit.querySelector(".popup__button");
export const buttonSubmitAdd = popupAdd.querySelector(".popup__button");
export const buttonSubmitAvatar = popupAvatar.querySelector(".popup__button");
export const buttonSubmitConfirm = popupConfirm.querySelector(".popup__button");

export const buttonEdit = document.querySelector(".profile__button_edit");
export const buttonAdd = document.querySelector(".profile__button_add");
//Поля
export const nameInput = document.querySelector(".popup__input_name");
export const professionInput = document.querySelector(".popup__input_profession");
export const avatarIcon = document.querySelector(".profile__avatar");
export const avatarOverlay = document.querySelector(".profile__overlay");
export const titleInput = popupAdd.querySelector(".popup__input_title");
export const linkInput = popupAdd.querySelector(".popup__input_link");
//Профиль
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");

export const titlePopupOpenImage = popupImage.querySelector(".popup__caption");
export const urlPopupOpenImage = popupImage.querySelector(".popup__image");

export const likesCount = document.querySelector(".like__counter");
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const myObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
