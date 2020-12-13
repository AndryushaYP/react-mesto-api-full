import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title={"Редактировать профиль"}
      name={"edit"}
      btnValue={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="popup__label">
        <input
          defaultValue={name}
          onChange={handleChangeName}
          placeholder="Имя"
          type="text"
          name="name"
          className="popup__input popup__input_name"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__error" id="name-error"></span>
      </label>

      <label className="popup__label">
        <input
          defaultValue={description}
          onChange={handleChangeDescription}
          placeholder="Занятие"
          type="text"
          name="about"
          minLength="2"
          maxLength="200"
          className="popup__input popup__input_profession"
          required
        />
        <span className="popup__error" id="about-error"></span>
      </label>
    </PopupWithForm>
  );
}
