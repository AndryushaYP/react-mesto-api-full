import React from "react";

export default function PopupWithForm({
  title,
  name,
  btnValue,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {

  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <form
        onSubmit={onSubmit}
        name={name}
        action="#"
        method="POST"
        className={`popup__form popup__form_type_${name}`}
        noValidate
      >
        <h2 className="popup__title">{title}</h2>

        {children}

        <button type="submit" value="" className="popup__button">
          {btnValue}
        </button>
        <button type="reset" className="popup__button-close" onClick={onClose}></button>
      </form>
    </div>
  );
}
