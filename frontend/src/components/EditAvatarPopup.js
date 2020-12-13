import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const urlRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(
      {
        avatar: urlRef.current.value,
      },
      () => {
        urlRef.current.value = "";
      }
    );
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={"avatar"}
      title={"Обновить аватар"}
      btnValue={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="popup__label">
        <input
          ref={urlRef}
          type="url"
          name="avatar"
          className="popup__input popup__input_link"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="popup__error" id="avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}
