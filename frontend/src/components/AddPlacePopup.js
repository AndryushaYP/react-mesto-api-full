import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(
      {
        link: linkRef.current.value,
        name: nameRef.current.value,
      },
      () => {
        linkRef.current.value = "";
        nameRef.current.value = "";
      }
    );
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title={"Новое место"}
      name={"add"}
      btnValue={"Создать"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="popup__label">
        <input
          ref={nameRef}
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          className="popup__input popup__input_title"
          placeholder="Название"
          required
        />
        <span className="popup__error" id="name-error"></span>
      </label>

      <label className="popup__label">
        <input
          ref={linkRef}
          type="url"
          name="link"
          className="popup__input popup__input_link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__error" id="link-error"></span>
      </label>
    </PopupWithForm>
  );
}
