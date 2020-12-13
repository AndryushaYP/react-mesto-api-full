import React from "react";

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_open-image ${card.link && "popup_opened"}`}>
      <div className="popup__container">
        <figure className="popup__card-contain">
          <img src={card.link} alt="" className="popup__image" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>

        <button type="button" className="popup__button-close" onClick={onClose}></button>
      </div>
    </div>
  );
}
