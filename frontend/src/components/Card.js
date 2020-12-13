import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ onCardDelete, onCardLike, onCardClick, card }) {
  function handleCard() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  return (
    <li className="cards__list-item">
      <img onClick={handleCard} src={card.link} alt="" className="card__image" />
      <h2 className="card__caption">{card.name}</h2>
      <div className="card__like-container">
        <button
          onClick={handleLikeClick}
          type="button"
          className={`card__button-like ${
            isLiked ? "card__button-like_active" : "card__button-like_disable"
          }`}
        ></button>
        <span className="like__counter">{card.likes.length}</span>
      </div>

      <button
        onClick={handleDeleteClick}
        type="button"
        className={isOwn ? "card__delete" : "card__delete_hidden"}
      ></button>
    </li>
  );
}
